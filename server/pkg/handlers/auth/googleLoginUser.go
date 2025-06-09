package auth

import (
	"context"

	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/Subhadip006/CityCare/pkg/utils"
	"github.com/gofiber/fiber/v2"
	"google.golang.org/api/idtoken"
)

func GoogleLogin(c *fiber.Ctx) error {
	var body struct {
		Token string `json:"token"`
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid request"})
	}

	payload, err := idtoken.Validate(context.Background(), body.Token, "802392548098-rojudnh96bvrgm42fpp05k2jm8ugrl90.apps.googleusercontent.com")
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "invalid google token"})
	}

	email, ok := payload.Claims["email"].(string)
	if !ok {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "email not found in token"})
	}

	name, _ := payload.Claims["name"].(string)

	var user models.User
	if err := db.DB.Where("email = ?", email).First(&user).Error; err != nil {
		user = models.User{
			Username: name,
			Email:    email,
			Role:     "citizen",
		}
		if err := db.DB.Create(&user).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "failed to create user"})
		}
	}

	token, err := utils.GenerateToken(user.ID, user.Role)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "failed to generate jwt"})
	}

	return c.JSON(fiber.Map{
		"token": token,
		"name":  user.Username,
		"email": user.Email,
	})
}
