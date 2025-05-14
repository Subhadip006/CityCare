package db

import (
	"fmt"
	"log"

	"github.com/Subhadip006/CityCare/pkg/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {

	dsn := "host=localhost	user=myuser password=mypassword dbname=mydb port=5432 sslmode=disable TimeZone=Asia/Shanghai"

	connection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	fmt.Println("connection successful")

	err = connection.AutoMigrate(&models.User{}, &models.Complaint{})

	if err != nil {
		log.Fatal("failed to migrate")
	}

	DB = connection

	fmt.Println("migration successful")

}
