package auth

import (
	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/Subhadip006/CityCare/pkg/utils"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func RequestedOfficer(c *fiber.Ctx) error {
	var officer models.RequestedOfficer

	if err := c.BodyParser(&officer); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request",
		})
	}

	hashed, err := bcrypt.GenerateFromPassword([]byte(officer.Password), 10)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Unable to hash password",
		})
	}
	officer.Password = string(hashed)

	if err := db.DB.Create(&officer).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failed to create officer",
		})
	}

	token, err := utils.GenerateToken(officer.ID, "officer") // assuming officer.UserID is correct field
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to generate token",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Registration request sent",
		"token":   token,
		"user_id": officer.ID,
	})
}
