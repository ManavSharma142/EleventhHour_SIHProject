package splitsgen

import (
	"context"
	"encoding/json"
	"net/http"
	"server/database"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func SelectWorkoutSplit(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	type Req struct {
		Username string `json:"username"`
		SplitID  string `json:"split_id"`
	}

	var req Req
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"username": req.Username}
	update := bson.M{"$set": bson.M{"split": req.SplitID}}

	_, err := database.Dbcoll.UpdateOne(ctx, filter, update)
	if err != nil {
		http.Error(w, "Failed to update user split", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(bson.M{
		"message":  "Split selected successfully",
		"username": req.Username,
		"split_id": req.SplitID,
	})
}

func GetUserSelectedSplit(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	username := r.URL.Query().Get("username")
	if username == "" {
		http.Error(w, "Missing username query param", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var user database.Data
	if err := database.Dbcoll.FindOne(ctx, bson.M{"username": username}).Decode(&user); err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	if user.SplitID == "" {
		http.Error(w, "No split selected for this user", http.StatusNotFound)
		return
	}

	var result struct {
		WorkoutPlan AIWorkoutSplit `bson:"workoutPlan"`
	}

	if err := database.Splitcoll.FindOne(ctx, bson.M{"id": user.SplitID}).Decode(&result); err != nil {
		http.Error(w, "Workout split not found", http.StatusNotFound)
		return
	}
	if err := json.NewEncoder(w).Encode(result.WorkoutPlan); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

func MarkDoneProgress(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	type Req struct {
		Username string   `json:"username"`
		Day      string   `json:"day"`
		Exercise []string `json:"exercise"`
		SplitID  string   `json:"split_id"`
	}
	var req Req
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// First, delete any existing progress record for this user/day/split
	_, err := database.Progresscoll.DeleteOne(ctx, bson.M{
		"username": req.Username,
		"day":      req.Day,
		"split_id": req.SplitID,
	})
	if err != nil {
		http.Error(w, "Failed to delete old progress", http.StatusInternalServerError)
		return
	}

	// Create new progress entry
	newProgress := bson.M{
		"username": req.Username,
		"day":      req.Day,
		"split_id": req.SplitID,
		"exercise": req.Exercise,
		"updated":  time.Now(),
	}

	_, err = database.Progresscoll.InsertOne(ctx, newProgress)
	if err != nil {
		http.Error(w, "Failed to insert new progress", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"status":   "ok",
		"username": req.Username,
		"day":      req.Day,
		"split_id": req.SplitID,
	})
}

func GetUserProgress(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Query params
	username := r.URL.Query().Get("username")
	splitID := r.URL.Query().Get("split_id")
	day := r.URL.Query().Get("day")

	if username == "" || splitID == "" {
		http.Error(w, "Missing username or split_id query param", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Build filter
	filter := bson.M{
		"username": username,
		"split_id": splitID,
	}
	if day != "" {
		filter["day"] = day
	}

	// Find all matching progress docs
	cursor, err := database.Progresscoll.Find(ctx, filter)
	if err != nil {
		http.Error(w, "Failed to fetch progress", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var progress []bson.M
	if err := cursor.All(ctx, &progress); err != nil {
		http.Error(w, "Failed to decode progress", http.StatusInternalServerError)
		return
	}

	if len(progress) == 0 {
		json.NewEncoder(w).Encode(map[string]string{"message": "No progress found"})
		return
	}

	json.NewEncoder(w).Encode(progress)
}
