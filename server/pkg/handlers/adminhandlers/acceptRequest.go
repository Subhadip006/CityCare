package adminhandlers

import (
	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/gofiber/fiber/v2"
)

func AcceptRequest(c *fiber.Ctx) error {

	id := c.Params("id")

	var reqOfficer models.RequestedOfficer

	if err := db.DB.First(&reqOfficer, id).Error; err != nil {

		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Requested Officer not found in the database",
		})
	}

	officer := models.Officer{
		Username:   reqOfficer.Username,
		Email:      reqOfficer.Email,
		Password:   reqOfficer.Password,
		Department: reqOfficer.Department,
		Role:       "Officer",
	}

	if err := db.DB.Create(&officer).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to import officer in database",
		})
	}

	if err := db.DB.Delete(&reqOfficer).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to delete requested officer from database",
		})
	}

	return c.Status(fiber.StatusAccepted).JSON(fiber.Map{
		"message":  "Request accepted Account avaliable for Official login",
		"username": officer.Username,
	})
}
