package api

import (
	"context"
	"encoding/json"
	"net/http"
	"server/database"
	"sort"

	"go.mongodb.org/mongo-driver/bson"
)

type User struct {
	Username string  `bson:"username" json:"username"`
	Flexcoin float64 `bson:"flexcoin" json:"flexcoin"`
}

func GetLeaderBoardData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var users []User

	cursor, err := database.Flexcoinscoll.Find(context.TODO(), bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(context.TODO())

	if err := cursor.All(context.TODO(), &users); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	sort.Slice(users, func(i, j int) bool {
		return users[i].Flexcoin > users[j].Flexcoin
	})
	//fmt.Println(users)
	if err := json.NewEncoder(w).Encode(users); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
