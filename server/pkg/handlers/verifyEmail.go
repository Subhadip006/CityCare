package handlers

import (
	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/Subhadip006/CityCare/pkg/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func VerifyEmail(c *fiber.Ctx) error {

	tokenstr := c.Query("token")

	if tokenstr == "" {

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "No token",
		})
	}

	token, err := utils.ParseJWT(tokenstr)

	if err != nil || !token.Valid {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "INvalid token",
		})
	}

	claims, ok := token.Claims.(jwt.MapClaims)

	if !ok || claims["user_id"] == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid token claims",
		})
	}

	userID := claims["user_id"]

	var user models.User

	if err := db.DB.First(&user, userID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	}

	if user.IsVerified {
		return c.Status(200).JSON(fiber.Map{"message": "Email already verified"})
	}

	user.IsVerified = true
	if err := db.DB.Save(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update user"})
	}

	return c.Redirect("http://localhost:5173/dashboard", fiber.StatusSeeOther)
}
