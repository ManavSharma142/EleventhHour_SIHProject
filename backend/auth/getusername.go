package auth

import (
	"log"
	"net/http"
	"server/utils"

	"github.com/dgrijalva/jwt-go"
)

func GetUsername(r *http.Request) string {
	cookie, _ := r.Cookie("authToken")

	tokenString := cookie.Value
	var claim JWTCredientials

	token, err := jwt.ParseWithClaims(tokenString, &claim, func(token *jwt.Token) (interface{}, error) {
		return []byte(utils.JWT_SECRET), nil
	})

	if err != nil || !token.Valid {
		log.Println("Invalid token:", err)
		return ""
	}
	return claim.Username
}
