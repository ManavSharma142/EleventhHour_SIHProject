package tools

import (
	"context"
	"server/database"

	"go.mongodb.org/mongo-driver/bson"
)

type resultdb struct {
	Username string `bson:"username"`
	Flexcoin int    `bson:"flexcoin"`
}

func GetFlexCoin(username string) int {
	filter := bson.M{
		"username": username,
	}
	var result resultdb
	database.Flexcoinscoll.FindOne(context.TODO(), filter).Decode(&result)
	return result.Flexcoin
}
