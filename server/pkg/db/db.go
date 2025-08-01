package db

import (
	"fmt"
	"log"
	"os"

	"github.com/Subhadip006/CityCare/pkg/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL environment variable is not set")
	}
	fmt.Println("Connecting to database...")

	connection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	fmt.Println("connection successful")

	err = connection.AutoMigrate(
		&models.User{},
		&models.Complaint{},
		&models.Officer{},
		&models.RequestedOfficer{},
		&models.Admin{},
		&models.ComplaintMedia{},
	)

	if err != nil {
		log.Fatal("failed to migrate")
	}

	DB = connection

	fmt.Println("migration successful")

}
