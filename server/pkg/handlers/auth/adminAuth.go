package auth

import (
	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/Subhadip006/CityCare/pkg/utils"
	"github.com/gofiber/fiber/v2"
)

func AdminAuth(c *fiber.Ctx) error {

	var body models.Admin

	err := c.BodyParser(&body)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request",
		})
	}

	var Admin models.Admin

	if err := db.DB.Where("unique_id = ?", body.UniqueID).First(&Admin).Error; err != nil {

		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "wrong admin credentials",
		})
	}

	token, err := utils.GenerateToken(Admin.ID, "admin")

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to generate token",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "admin login successful",
		"token":   token,
	})

}
