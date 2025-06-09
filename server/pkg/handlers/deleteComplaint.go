package handlers

import (
	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/gofiber/fiber/v2"
)

func DeleteComplaint(c *fiber.Ctx) error {
	id := c.Params("id")

	var complaint models.Complaint

	// Find the complaint
	if err := db.DB.First(&complaint, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Complaint not found",
		})
	}

	// Delete the complaint (Unscoped if you want to force delete)
	if err := db.DB.Unscoped().Delete(&complaint).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to delete complaint",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Complaint deleted successfully",
	})
}
