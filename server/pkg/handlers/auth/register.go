package auth

import (
	"fmt"

	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/Subhadip006/CityCare/pkg/utils"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *fiber.Ctx) error {

	var user models.User

	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request",
		})
	}

	hashed, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "could not hash passord"})
	}

	user.Password = string(hashed)

	if err := db.DB.Create(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "could not create user"})
	}

	token, err := utils.GenerateToken(user.ID, user.Role)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "could not generate token",
		})
	}

	err = utils.SendVerificationMail(user.Email, token)

	if err != nil {

		fmt.Println("Error sending verification email:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to send email",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":  "user created, verification email sent",
		"token":    token,
		"verified": user.IsVerified,
	})
}
