package splitsgen

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"server/database"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type WorkoutRequest struct {
	Time        string `json:"time" jsonschema:"description=time available for workout"`                                     //e.g., 30 minutes, 1 hour
	Catagory    string `json:"category" jsonschema:"description=category of exercise (e.g., cardio, strength, flexibility)"` //e.g., cardio, strength, flexibility
	Goal        string `json:"goal" jsonschema:"description=goal for workout"`                                               //e.g., muscle gain, fat loss, endurance
	DaysPerWeek int    `json:"days_per_week" jsonschema:"description=day per week available for workout"`                    //e.g., 3, 4, 5
	Preference  string `json:"preference" jsonschema:"description=preference of user (Home/GYM)"`                            //e.g., home, gym
	Other       string `json:"other" jsonschema:"description=any other specific requirements or notes"`                      //e.g., injuries, specific exercises to include/exclude
}

func GenerateWorkoutSplits(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var data WorkoutRequest
	json.NewDecoder(r.Body).Decode(&data)
	fmt.Println(data)
	workoutSplits := GenerateAIWorkoutSplits(data)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := database.Splitcoll.InsertOne(ctx, bson.M{
		"id":          workoutSplits.ID,
		"request":     data,
		"workoutPlan": workoutSplits,
		"createdAt":   time.Now(),
	})
	if err != nil {
		http.Error(w, "Failed to save workout plan", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(workoutSplits)
}
