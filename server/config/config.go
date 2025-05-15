package config

import (
	"log"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	rootPath, err := filepath.Abs(filepath.Join(".."))
	if err != nil {
		log.Fatal("Could not resolve project root:", err)
	}
	err = godotenv.Load(filepath.Join(rootPath, ".env"))
	if err != nil {
		log.Fatal("Error loading .env file from root:", err)
	}

}

func GetJWTSecret() []byte {
	return []byte(os.Getenv("JWT_SECRET"))
}
