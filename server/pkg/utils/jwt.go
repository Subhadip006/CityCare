package utils

import (
	"time"

	"github.com/Subhadip006/CityCare/config"
	"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(userID uint) (string, error) {

	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     jwt.NewNumericDate(time.Now().Add(time.Hour * 72)).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(config.GetJWTSecret())
}

func ParseJWT(tokenStr string) (*jwt.Token, error) {

	return jwt.Parse(tokenStr, func(token *jwt.Token) (any, error) {
		return config.GetJWTSecret(), nil
	})
}
