package routes

import (
	"github.com/Subhadip006/CityCare/pkg/handlers"
	"github.com/Subhadip006/CityCare/pkg/handlers/adminhandlers"
	"github.com/Subhadip006/CityCare/pkg/handlers/auth"
	"github.com/Subhadip006/CityCare/pkg/middleware"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	//public
	app.Post("/register", auth.Register)
	app.Post("/login", auth.Login)
	app.Post("/officerLogin", auth.OfficeLogin)
	app.Post("/officerRegister", auth.RequestedOfficer)
	app.Post("/auth/google", auth.GoogleLogin)

	//admin

	app.Get("/officerRequest", adminhandlers.GetRequestOfficer)
	app.Post("/officerAccept/:id", adminhandlers.AcceptRequest)
	app.Post("/adminAuth", auth.AdminAuth)
	app.Post("/officerDeny/:id", adminhandlers.DenyRequest)
	app.Get("/verify", handlers.VerifyEmail)

	userGroup := app.Group("/", middleware.Protected()) //middleware.RoleMiddleware("user"))

	userGroup.Get("/dashboard", handlers.DashboardHandler)
	userGroup.Get("/complaints", handlers.GetComplaints)
	userGroup.Post("/complaint", handlers.ComplaintSubmit)
	userGroup.Delete("/complaints/:id", handlers.DeleteComplaint)

}
