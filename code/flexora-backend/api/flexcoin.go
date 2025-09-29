package api

import (
	"context"
	"encoding/json"
	"net/http"
	"server/database"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type fitcoinschema struct {
	Username string  `bson:"username"`
	Flexcoin float64 `bson:"flexcoin"`
	LastStep int     `bson:"laststep"`
	Updated  time.Time
}

func FlexCoinHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	username := r.URL.Query().Get("username")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Build filter
	filter := bson.M{
		"username": username,
	}
	var result fitcoinschema
	database.Flexcoinscoll.FindOne(ctx, filter).Decode(&result)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(bson.M{
		"message":  "Flex coins fetched successfully",
		"username": username,
		"coins":    result.Flexcoin,
	})
}
