package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load("./.env")

	if err != nil {
		log.Println("No envs")
	}
}

func GetJWTSecret() []byte {
	return []byte(os.Getenv("JWT_SECRET"))
}
