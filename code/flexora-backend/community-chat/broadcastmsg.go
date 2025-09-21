package communitychat

import (
	"log"
	"server/utils"
)

func BroadCastMsg() {
	for {
		msg := <-utils.CommunityChatMsg
		from := msg.Username
		log.Println("Broadcasting message from", from, "to all users - ", msg.Text)
		for user, conn := range utils.ChatUserConn {
			if CountConn() == 1 {
				utils.ChatUserConn[from].WriteJSON(utils.Message{Username: "Bot", Text: "No one is online rn"})
				break
			}
			if user != from {
				err := conn.WriteJSON(msg)
				if err != nil {
					log.Println(utils.Red(err))
					conn.Close()
				}
			}
		}
	}
}
