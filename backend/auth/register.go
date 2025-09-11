package auth

import (
	"encoding/json"
	"log"
	"net/http"
	"server/database"
)

func Register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var data Credientials
	json.NewDecoder(r.Body).Decode(&data)
	err := database.AddUser(data.Username, data.Password)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error"})
		w.WriteHeader(http.StatusConflict)
		return
	}
	log.Println("User registered:", data.Username)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "done"})

}
