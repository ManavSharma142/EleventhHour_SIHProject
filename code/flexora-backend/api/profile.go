package api

import (
	"context"
	"encoding/json"
	"net/http"
	"server/auth"
	"server/database"

	"go.mongodb.org/mongo-driver/bson"
)

type UpdateData struct {
	Name        string `json:"name"`
	Age         string `json:"age"`
	Gender      string `json:"gender"`
	FitnessGoal string `json:"fitnessGoal"`
	Experience  string `json:"experience"`
}

func GetUserProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	username := auth.GetUsername(r)
	user, err := database.GetUser(username)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	var connected bool = false
	if user.OAuth != "" {
		connected = true
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]any{
		"username":   user.Username,
		"name":       user.Name,
		"age":        user.Age,
		"gender":     user.Gender,
		"goal":       user.Goal,
		"exp":        user.Exp,
		"profilepic": user.Pic,
		"email":      user.Email,
		"googlefit":  connected,
	})
}

func UpdateProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	username := auth.GetUsername(r)
	var data UpdateData
	json.NewDecoder(r.Body).Decode(&data)
	database.Dbcoll.UpdateOne(context.TODO(), bson.M{"username": username}, bson.M{"$set": bson.M{"name": data.Name, "age": data.Age, "gender": data.Gender, "goal": data.FitnessGoal, "exp": data.Experience}})
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "done"})

}
