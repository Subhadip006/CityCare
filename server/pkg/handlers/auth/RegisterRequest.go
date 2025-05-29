package auth

import (
	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func RequestedOfficer(c *fiber.Ctx) error {

	var officer models.RequestedOfficer

	if err := c.BodyParser(&officer); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid Reqest",
		})
	}

	hashed, err := bcrypt.GenerateFromPassword([]byte(officer.Password), 10)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "unable to generate hashed password",
		})
	}

	officer.Password = string(hashed)

	if err := db.DB.Create(&officer).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failed to create officer",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "user Created",
	})
}
