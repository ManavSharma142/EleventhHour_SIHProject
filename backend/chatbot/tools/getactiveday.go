package tools

import (
	"context"
	"encoding/json"
	"server/database"
	"sort"
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

func GetActiveDay(username string) string {

	var d activedaysschema
	err := database.Activedayscoll.FindOne(context.TODO(), bson.M{"username": username}).Decode(&d)
	if err != nil {
		return "user not found"
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
	res, _ := json.Marshal(resp)
	return string(res)
}
