package adminhandlers

import (
	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/gofiber/fiber/v2"
)

func GetRequestOfficer(c *fiber.Ctx) error {
	var officers []models.RequestedOfficer

	if err := db.DB.Find(&officers).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Unable to retrive data",
		})
	}

	return c.JSON(officers)
}
