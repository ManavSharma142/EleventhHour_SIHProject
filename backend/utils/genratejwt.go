package utils

import (
	"log"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type JWTCredientials struct {
	Username string
	jwt.StandardClaims
}

func GenerateJWTSecret(username string) string {
	var claims = &JWTCredientials{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 86).Unix(),
		},
	}
	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(JWT_SECRET))
	if err != nil {
		log.Println("Request failed internal error: ", err)
		return ""
	}
	return token
}
