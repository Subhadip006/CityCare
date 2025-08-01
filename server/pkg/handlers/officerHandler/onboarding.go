package officerhandler

import (
	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/Subhadip006/CityCare/pkg/utils"
	"github.com/gofiber/fiber/v2"
)

func OnboardingHandler(c *fiber.Ctx) error {
	userID, ok := c.Locals("user_id").(uint)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid user ID in token",
		})
	}

	var officer models.RequestedOfficer
	if err := db.DB.Where("id = ?", userID).First(&officer).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Officer not found",
		})
	}

	if officer.Onboarded {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"message": "Officer is already onboarded",
		})
	}

	name := c.FormValue("username")
	department := c.FormValue("department")
	phone := c.FormValue("phone")
	sector := c.FormValue("sector")

	if name == "" || department == "" || phone == "" || sector == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "All fields are required",
		})
	}

	file, err := c.FormFile("id_image")
	var imageURL string
	if err == nil {
		imageURL, err = utils.UploadToCloudinary(file)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to upload ID image to Cloudinary",
			})
		}

		officer.ImageURL = imageURL

	}

	officer.Username = name
	officer.Department = department
	officer.Phone = phone
	officer.Sector = sector
	officer.Onboarded = true

	if err := db.DB.Save(&officer).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update officer details",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Officer onboarded successfully",
		"user_id": officer.ID,
	})
}
