package communitychat

import (
	"fmt"
	"log"
	"net/http"
	"server/utils"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // allow all origins for WebSocket
	},
}

func HandleChatbot(w http.ResponseWriter, r *http.Request) {
	fmt.Println("new connection")
	username := r.URL.Query().Get("username")
	if username == "" {
		http.Error(w, "username is required", http.StatusBadRequest)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(utils.Red(err))
		return
	}
	utils.ChatConn[conn] = true
	utils.ChatUser[conn] = username
	utils.ChatUserConn[username] = conn
	log.Println("New WebSocket Connection from IP:", r.RemoteAddr, utils.Yellow(" username: ", username), "Total Connections:", CountConn())
	defer func() {
		log.Println(utils.Magenta("Cleaning up user: ", username))
		delete(utils.ChatConn, conn)
		delete(utils.ChatUserConn, username)
		delete(utils.ChatUser, conn)
		conn.Close()
	}()
	for {
		var msg utils.Message
		err := conn.ReadJSON(&msg)
		if err != nil {
			log.Println(utils.Red(err))
			break
		}
		utils.CommunityChatMsg <- msg
	}
}
func CountConn() int {
	count := 0
	for _, j := range utils.ChatConn {
		if j {
			count++
		}
	}
	return count
}
