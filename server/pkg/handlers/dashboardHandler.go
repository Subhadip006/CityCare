package handlers

import (
	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/gofiber/fiber/v2"
)

func DashboardHandler(c *fiber.Ctx) error {
	userID := c.Locals("user_id")

	var user models.User
	err := db.DB.Where("id = ?", userID).First(&user).Error

	if err != nil {
		c.JSON(fiber.Map{
			"error": "Unable to fetch",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Welcome " + user.Username,
		"User_id": userID,
	})
}
