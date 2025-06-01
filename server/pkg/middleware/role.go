package middleware

import "github.com/gofiber/fiber/v2"

func RoleMiddleware(Roles ...string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		role := c.Locals("role")

		if role == nil {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"error": "role not found",
			})
		}

		userRole := role.(string)

		for _, allowed := range Roles {
			if userRole == allowed {
				return c.Next()
			}
		}

		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"error":   "access denied",
			"message": "You do not have permission to access this resource",
		})
	}
}
