package routes

import (
	"github.com/Subhadip006/CityCare/pkg/handlers"
	"github.com/Subhadip006/CityCare/pkg/handlers/adminhandlers"
	"github.com/Subhadip006/CityCare/pkg/handlers/auth"
	officerhandler "github.com/Subhadip006/CityCare/pkg/handlers/officerHandler"
	"github.com/Subhadip006/CityCare/pkg/middleware"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	// === Public Routes ===
	app.Post("/register", auth.Register)
	app.Post("/login", auth.Login)
	app.Post("/officerLogin", auth.OfficeLogin)
	app.Post("/officerRegister", auth.RequestedOfficer)
	app.Post("/auth/google", auth.GoogleLogin)
	app.Get("/verify", handlers.VerifyEmail)

	// === Protected User Routes ===
	userGroup := app.Group("/", middleware.Protected())

	userGroup.Get("/dashboard", handlers.DashboardHandler)
	userGroup.Get("/complaints", handlers.GetComplaints)
	userGroup.Post("/complaint", handlers.ComplaintSubmit)
	userGroup.Delete("/complaints/:id", handlers.DeleteComplaint)
	userGroup.Get("/complaints/department/:id", handlers.GetComplaintsByDepartment)

	// === Officer Routes ===
	officerGroup := userGroup.Group("/officer", middleware.RoleMiddleware("Officer"))
	officerGroup.Post("/:id", officerhandler.OnboardingHandler)
	officerGroup.Get("/profile", officerhandler.GetOfficerProfile)

	// === Admin Routes ===
	adminGroup := userGroup.Group("/admin", middleware.RoleMiddleware("admin"))
	adminGroup.Get("/officerRequest", adminhandlers.GetRequestOfficer)
	adminGroup.Post("/officerAccept/:id", adminhandlers.AcceptRequest)
	adminGroup.Post("/officerDeny/:id", adminhandlers.DenyRequest)
	adminGroup.Post("/auth", auth.AdminAuth)
}
