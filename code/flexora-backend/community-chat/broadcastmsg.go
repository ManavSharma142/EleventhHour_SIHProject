package communitychat

import (
	"log"
	"server/utils"
)

func BroadCastMsg() {
	for {
		msg := <-utils.CommunityChatMsg
		from := msg.Username
		if CountConn() == 1 {
			utils.ChatUserConn[from].WriteJSON(utils.Message{Username: "Bot", Text: "No one is online rn"})
			continue
		}
		log.Println("Broadcasting message from", from, "to all users - ", msg.Text)
		for user, conn := range utils.ChatUserConn {
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
