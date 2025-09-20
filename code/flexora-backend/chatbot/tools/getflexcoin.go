package tools

import (
	"context"
	"fmt"
	"server/database"

	"go.mongodb.org/mongo-driver/bson"
)

type resultdb struct {
	Username string `bson:"username"`
	Flexcoin int    `bson:"flexcoin"`
}

func GetFlexCoin(username string) string {
	filter := bson.M{
		"username": username,
	}
	var result resultdb
	database.Flexcoinscoll.FindOne(context.TODO(), filter).Decode(&result)
	res := fmt.Sprintf("flexcoin of %s is %d", username, result.Flexcoin)
	return res
}
