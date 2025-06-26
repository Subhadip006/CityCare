package officerhandler

import (
	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/gofiber/fiber/v2"
)

func GetOfficerProfile(c *fiber.Ctx) error {
	userID := c.Locals("user_id")

	id, ok := userID.(uint)
	if !ok {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid user ID in token",
		})
	}

	var officer models.Officer
	if err := db.DB.First(&officer, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Officer not found",
		})
	}

	return c.JSON(fiber.Map{
		"id":         officer.ID,
		"name":       officer.Username,
		"email":      officer.Email,
		"department": officer.Department,
	})
}
