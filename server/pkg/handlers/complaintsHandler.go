package handlers

import (
	"log"
	"strconv"

	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/gofiber/fiber/v2"
)

func ComplaintSubmit(c *fiber.Ctx) error {
	userID := c.Locals("user_id")

	title := c.FormValue("Title")
	department := c.FormValue("Department")
	description := c.FormValue("Description")
	longitudeStr := c.FormValue("Longitude")
	latitudeStr := c.FormValue("Latitude")

	latitude, err := strconv.ParseFloat(latitudeStr, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid Latitude value",
		})
	}

	longitude, err := strconv.ParseFloat(longitudeStr, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid Longitude value",
		})
	}

	user, ok := userID.(uint)
	if !ok {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid User",
		})
	}

	complaint := models.Complaint{
		UserID:      user,
		Title:       title,
		Description: description,
		Department:  department,
		Latitude:    latitude,
		Longitude:   longitude,
	}

	if err := db.DB.Create(&complaint).Error; err != nil {
		return c.Status(fiber.ErrBadRequest.Code).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Complaint Uploaded Successfully",
	})
}

func GetComplaints(c *fiber.Ctx) error {
	userID := c.Locals("user_id")

	user, ok := userID.(uint)
	if !ok {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid User",
		})
	}

	var complaints []models.Complaint
	if err := db.DB.Where("user_id = ?", user).Find(&complaints).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "unable to fetch complaints",
		})
	}

	return c.Status(fiber.StatusOK).JSON(complaints)
}

func GetComplaintsByDepartment(c *fiber.Ctx) error {
	// Step 1: Get Officer ID
	officerID := c.Params("id")

	var officer models.Officer
	if err := db.DB.First(&officer, officerID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Officer profile not found",
		})
	}

	// Step 2: Filter complaints by department
	var complaints []models.Complaint
	if err := db.DB.Where("LOWER(department) = LOWER(?)", officer.Department).Find(&complaints).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch complaints",
		})
	}

	log.Printf("Fetched %d complaints for department: %s", len(complaints), officer.Department)

	return c.Status(fiber.StatusOK).JSON(complaints)
}
