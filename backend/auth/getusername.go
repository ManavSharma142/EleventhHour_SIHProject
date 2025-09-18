package auth

import (
	"log"
	"net/http"
	"server/utils"

	"github.com/dgrijalva/jwt-go"
)

func GetUsername(r *http.Request) string {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		log.Println("No Authorization header")
		return ""
	}

	// Expect format: "Bearer <token>"
	const prefix = "Bearer "
	if len(authHeader) <= len(prefix) || authHeader[:len(prefix)] != prefix {
		log.Println("Invalid Authorization header format")
		return ""
	}

	tokenString := authHeader[len(prefix):]
	var claim JWTCredientials

	token, err := jwt.ParseWithClaims(tokenString, &claim, func(token *jwt.Token) (interface{}, error) {
		return []byte(utils.JWT_SECRET), nil
	})
	if err != nil {
		log.Println("JWT parse error:", err)
		return ""
	}

	if !token.Valid {
		log.Println("Invalid JWT token")
		return ""
	}

	return claim.Username
}
