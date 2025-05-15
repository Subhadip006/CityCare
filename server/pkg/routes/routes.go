package routes

import (
	"github.com/Subhadip006/CityCare/pkg/handlers"
	"github.com/Subhadip006/CityCare/pkg/handlers/auth"
	"github.com/Subhadip006/CityCare/pkg/middleware"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	//public
	app.Post("/register", auth.Register)
	app.Post("/login", auth.Login)

	protected := app.Group("/", middleware.Protected())

	protected.Get("/dashboard", handlers.DashboardHandler)
}
