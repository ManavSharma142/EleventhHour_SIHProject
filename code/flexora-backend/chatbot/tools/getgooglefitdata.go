package tools

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"server/auth"
	"server/database"
	"time"
)

type GoogleFitResponse struct {
	Bucket []struct {
		StartTimeMillis string `json:"startTimeMillis"`
		EndTimeMillis   string `json:"endTimeMillis"`
		Dataset         []struct {
			DataSourceId       string `json:"dataSourceId"`
			DataTypeName       string `json:"dataTypeName"`
			OriginDataSourceId string `json:"originDataSourceId"`
			Point              []struct {
				StartTimeNanos     string `json:"startTimeNanos"`
				EndTimeNanos       string `json:"endTimeNanos"`
				DataTypeName       string `json:"dataTypeName"`
				OriginDataSourceId string `json:"originDataSourceId"`
				Value              []struct {
					IntVal int     `json:"intVal,omitempty"`
					FpVal  float64 `json:"fpVal,omitempty"`
					MapVal []any   `json:"mapVal"`
				} `json:"value"`
			} `json:"point"`
		} `json:"dataset"`
	} `json:"bucket"`
}

func GetGoogleFitData(username string) string {

	// 1. Fetch user from DB
	user, err := database.GetUser(username)
	if err != nil {
		return "user not found"
	}

	token, err := auth.GetAccessToken(user.OAuth)
	if err != nil {
		return "failed to refresh token"
	}

	now := time.Now()
	startOfDay := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location()).UnixMilli()
	endOfDay := time.Date(now.Year(), now.Month(), now.Day(), 23, 59, 59, 999000000, now.Location()).UnixMilli()

	// 4. Build request payload
	payload := map[string]interface{}{
		"aggregateBy": []map[string]string{
			{"dataTypeName": "com.google.step_count.delta"},
			{"dataTypeName": "com.google.calories.expended"},
		},
		"bucketByTime":    map[string]int64{"durationMillis": 86400000}, // daily
		"startTimeMillis": startOfDay,
		"endTimeMillis":   endOfDay,
	}

	body, _ := json.Marshal(payload)

	req, _ := http.NewRequest("POST", "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", bytes.NewBuffer(body))
	req.Header.Set("Authorization", "Bearer "+token.AccessToken)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "failed to call Google Fit"
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)
	var re GoogleFitResponse
	json.Unmarshal(respBody, &re)
	steps := 0
	calories := 0.0

	if len(re.Bucket) > 0 {
		if len(re.Bucket[0].Dataset) > 0 {
			if len(re.Bucket[0].Dataset[0].Point) > 0 && len(re.Bucket[0].Dataset[0].Point[0].Value) > 0 {
				steps = re.Bucket[0].Dataset[0].Point[0].Value[0].IntVal
			}
			if len(re.Bucket[0].Dataset) > 1 && len(re.Bucket[0].Dataset[1].Point) > 0 && len(re.Bucket[0].Dataset[1].Point[0].Value) > 0 {
				calories = re.Bucket[0].Dataset[1].Point[0].Value[0].FpVal
			}
		}
	}

	result := fmt.Sprintf("Steps: %d, Calories: %.2f", steps, calories)
	return result
}
