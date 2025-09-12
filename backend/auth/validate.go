package auth

import (
	"encoding/json"
	"log"
	"net/http"
	"server/utils"

	"github.com/dgrijalva/jwt-go"
)

func Validate(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	cookie, err := r.Cookie("authToken")
	if err != nil {
		log.Println("No auth cookie:", err)
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"status": "unauthorized"})
		return
	}

	tokenString := cookie.Value
	var claim JWTCredientials

	token, err := jwt.ParseWithClaims(tokenString, &claim, func(token *jwt.Token) (interface{}, error) {
		return []byte(utils.JWT_SECRET), nil
	})

	if err != nil || !token.Valid {
		log.Println("Invalid token:", err)
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"status": "error"})
		return
	}

	log.Println("User validated:", claim.Username)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"username": claim.Username,
		"status":   "done",
	})
}
