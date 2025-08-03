package main

import (
	"fmt"
	"log"

	"github.com/Subhadip006/CityCare/config"
	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {

	config.LoadEnv()

	db.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000,http://frontend:3000, https://citycare-live.vercel.app",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
		AllowCredentials: true,
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Welcome to CityCare API")
	})

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.SendString("ok")
	})

	routes.Setup(app)

	fmt.Println("server is starting")

	log.Fatal(app.Listen(":8080"))

}
