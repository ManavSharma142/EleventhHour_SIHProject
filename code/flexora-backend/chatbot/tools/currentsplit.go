package tools

import (
	"context"
	"encoding/json"
	"server/database"
	"server/splitsgen"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func GetCurrentSplit(username string) string {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var user database.Data
	if err := database.Dbcoll.FindOne(ctx, bson.M{"username": username}).Decode(&user); err != nil {
		return "user not found"
	}

	if user.SplitID == "" {
		return "no split selected for this user"
	}

	var result struct {
		WorkoutPlan splitsgen.AIWorkoutSplit `bson:"workoutPlan"`
	}

	if err := database.Splitcoll.FindOne(ctx, bson.M{"id": user.SplitID}).Decode(&result); err != nil {
		return "workout split not found"
	}
	res, _ := json.Marshal(result.WorkoutPlan)
	return string(res)
}
