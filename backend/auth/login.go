package auth

import (
	"encoding/json"
	"log"
	"net/http"
	"server/database"
	"server/utils"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type Credientials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type JWTCredientials struct {
	Username string
	jwt.StandardClaims
}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var data Credientials
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"status": "invalid request"})
		return
	}
	log.Println("Login request received for:", data.Username)

	pass, err := database.GetUserPassword(data.Username)
	if err != nil {
		log.Println("No user found:", data.Username)
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"status": "error"})
		return
	}

	if pass != data.Password {
		log.Println("Password mismatch for:", data.Username)
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"status": "error"})
		return
	}

	// Create JWT claims
	claims := &JWTCredientials{
		Username: data.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 56).Unix(),
		},
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(utils.JWT_SECRET))
	if err != nil {
		log.Println("JWT signing error for:", data.Username, err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"status": "error"})
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "authToken",
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
		Expires:  time.Now().Add(24 * time.Hour),
	})

	log.Println("Login successful for:", data.Username)

	// Send only status response, no token in body
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "done"})
}
