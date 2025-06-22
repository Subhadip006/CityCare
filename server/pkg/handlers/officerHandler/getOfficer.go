package officerhandler

import (
	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/gofiber/fiber/v2"
)

func GetOfficerProfile(c *fiber.Ctx) error {
	userID := uint(c.Locals("user_id").(uint))
	role := c.Locals("role")

	if role != "officer" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized access",
		})
	}

	var officer models.Officer
	if err := db.DB.First(&officer, userID).Error; err != nil {
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
