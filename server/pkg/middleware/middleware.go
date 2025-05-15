package middleware

import (
	"strings"

	"github.com/Subhadip006/CityCare/pkg/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func Protected() fiber.Handler {

	return func(c *fiber.Ctx) error {

		authHead := c.Get(("Authorization"))

		if authHead == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "No token",
			})
		}

		strParts := strings.Split(authHead, " ")

		if (len(strParts) != 2) || strParts[0] != "Bearer" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Invalid token",
			})
		}

		tokenStr := strParts[1]

		token, err := utils.ParseJWT(tokenStr)

		if err != nil || !token.Valid {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Expired token",
			})
		}

		claims := token.Claims.(jwt.MapClaims)
		userID := uint(claims["user_id"].(float64))
		c.Locals("user_id", userID)

		return c.Next()

	}
}
