package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func helloHandler(c *fiber.Ctx) error {
	return c.SendString("hello world")
}

func main() {
	fmt.Println("Hello, World!")

	app := fiber.New()

	app.Get("/", helloHandler)

	app.Listen(":8080")
}
