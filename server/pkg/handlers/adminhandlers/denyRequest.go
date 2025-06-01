package adminhandlers

import (
	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/gofiber/fiber/v2"
)

func DenyRequest(c *fiber.Ctx) error {
	id := c.Params("id")

	var reqOfficer models.RequestedOfficer

	if err := db.DB.First(&reqOfficer, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "requested officer is not found",
		})
	}

	if err := db.DB.Unscoped().Delete(&reqOfficer).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": " failed to delete"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "request deleted",
	})
}
