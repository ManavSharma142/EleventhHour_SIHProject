package api

import (
	"context"
	"encoding/json"
	"net/http"
	"server/database"
	"sort"
	"strconv"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type datecount struct {
	Date  time.Time `bson:"date" json:"date"`
	Count int       `bson:"count" json:"count"`
}

type activedaysschema struct {
	Username   string      `bson:"username" json:"username"`
	ActiveDays []datecount `bson:"activedays" json:"activedays"`
}

type streakResponse struct {
	TotalActiveDays int         `json:"total_active_days"`
	CurrentStreak   int         `json:"current_streak"`
	MaxStreak       int         `json:"max_streak"`
	ActiveDays      []datecount `json:"active_days"`
}

func ActiveDaysHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	username := r.URL.Query().Get("username")
	countStr := r.URL.Query().Get("count")

	if username == "" || countStr == "" {
		http.Error(w, "username and count are required", http.StatusBadRequest)
		return
	}

	count, err := strconv.Atoi(countStr)
	if err != nil {
		http.Error(w, "invalid count", http.StatusBadRequest)
		return
	}

	var d activedaysschema
	err = database.Activedayscoll.FindOne(context.TODO(), bson.M{"username": username}).Decode(&d)

	today := time.Now().Truncate(24 * time.Hour)

	if err != nil {

		newDoc := activedaysschema{
			Username: username,
			ActiveDays: []datecount{
				{Date: today, Count: count},
			},
		}
		_, _ = database.Activedayscoll.InsertOne(context.TODO(), newDoc)
	} else {
		updated := false
		for _, dc := range d.ActiveDays {
			if dc.Date.Equal(today) {
				_, _ = database.Activedayscoll.UpdateOne(
					context.TODO(),
					bson.M{"username": username, "activedays.date": today},
					bson.M{"$inc": bson.M{"activedays.$.count": count}},
				)
				updated = true
				break
			}
		}
		if !updated {
			_, _ = database.Activedayscoll.UpdateOne(
				context.TODO(),
				bson.M{"username": username},
				bson.M{"$push": bson.M{"activedays": datecount{Date: today, Count: count}}},
			)
		}
	}

	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(bson.M{"status": "ok"})
}

func StreakHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	username := r.URL.Query().Get("username")

	var d activedaysschema
	err := database.Activedayscoll.FindOne(context.TODO(), bson.M{"username": username}).Decode(&d)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		_ = json.NewEncoder(w).Encode(bson.M{"error": "user not found"})
		return
	}

	if len(d.ActiveDays) == 0 {
		resp := streakResponse{TotalActiveDays: 0, CurrentStreak: 0, MaxStreak: 0, ActiveDays: []datecount{}}
		_ = json.NewEncoder(w).Encode(resp)
		return
	}

	sort.Slice(d.ActiveDays, func(i, j int) bool {
		return d.ActiveDays[i].Date.Before(d.ActiveDays[j].Date)
	})

	total := len(d.ActiveDays)
	maxStreak := 1
	currentStreak := 1

	today := time.Now().Truncate(24 * time.Hour)
	last := d.ActiveDays[0].Date.Truncate(24 * time.Hour)

	for i := 1; i < len(d.ActiveDays); i++ {
		curr := d.ActiveDays[i].Date.Truncate(24 * time.Hour)
		if curr.Equal(last.Add(24 * time.Hour)) {
			currentStreak++
		} else {
			if currentStreak > maxStreak {
				maxStreak = currentStreak
			}
			currentStreak = 1
		}
		last = curr
	}

	if currentStreak > maxStreak {
		maxStreak = currentStreak
	}

	lastDay := d.ActiveDays[len(d.ActiveDays)-1].Date.Truncate(24 * time.Hour)
	if !lastDay.Equal(today) && !lastDay.Equal(today.Add(-24*time.Hour)) {
		currentStreak = 0
	}

	resp := streakResponse{
		TotalActiveDays: total,
		CurrentStreak:   currentStreak,
		MaxStreak:       maxStreak,
		ActiveDays:      d.ActiveDays,
	}
	_ = json.NewEncoder(w).Encode(resp)
}
