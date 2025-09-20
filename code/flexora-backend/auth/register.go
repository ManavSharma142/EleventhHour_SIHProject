package auth

import (
	"encoding/json"
	"log"
	"net/http"
	"server/database"
)

type RegisterData struct {
	Username    string `json:"username"`
	Password    string `json:"password"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	Age         string `json:"age"`
	Gender      string `json:"gender"`
	FitnessGoal string `json:"fitnessGoal"`
	Experience  string `json:"experience"`
}

func Register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var data RegisterData
	json.NewDecoder(r.Body).Decode(&data)
	err := database.AddUser(data.Username, data.Password, "", data.Email, data.Name, data.Age, data.Gender, data.FitnessGoal, data.Experience, "")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error"})
		w.WriteHeader(http.StatusConflict)
		return
	}
	log.Println("User registered:", data.Username)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "done"})

}
