package chatbot

import (
	"log"
	"net/http"
	"server/utils"

	"github.com/gorilla/websocket"
)

type Message struct {
	Text string `json:"text"`
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // allow all origins for WebSocket
	},
}

func HandleChatbot(w http.ResponseWriter, r *http.Request) {
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
	utils.LiveConn[conn] = true
	utils.ConnUser[conn] = username
	utils.UserConn[username] = conn
	log.Println("New WebSocket Connection from IP:", r.RemoteAddr, utils.Yellow(" username: ", username), utils.Cyan(" Total Connections : ", CountConn()))
	defer func() {
		log.Println(utils.Magenta("Cleaning up user: ", username))
		delete(utils.LiveConn, conn)
		delete(utils.UserConn, username)
		delete(utils.ConnUser, conn)
		conn.Close()
	}()
	for {
		var msg Message
		err := conn.ReadJSON(&msg)
		if err != nil {
			log.Println(utils.Red(err))
			break
		}
		AddToMemoryUSER(username, msg.Text)
		Chatbot(utils.Memory[username], username)
	}
}

func CountConn() int {
	count := 0
	for _, j := range utils.LiveConn {
		if j {
			count++
		}
	}
	return count
}
