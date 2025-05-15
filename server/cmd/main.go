package main

import (
	"fmt"

	"github.com/Subhadip006/CityCare/config"
	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/handlers/auth"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	config.LoadEnv()

	db.Connect()
	fmt.Println("Hello, World!")

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Post("/register", auth.Register)
	app.Post(("/login"), auth.Login)

	app.Listen(":8080")

	fmt.Println("server is started")
}
