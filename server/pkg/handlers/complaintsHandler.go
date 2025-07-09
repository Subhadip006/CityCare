package handlers

import (
	"log"
	"strconv"

	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/Subhadip006/CityCare/pkg/utils"
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

	var imageURL string

	// Upload first media file (if any)
	form, err := c.MultipartForm()
	if err == nil && form.File != nil && len(form.File["media"]) > 0 {
		file := form.File["media"][0] // Take only the first file
		imageURL, err = utils.UploadToCloudinary(file)
		if err != nil {
			log.Println("Cloudinary upload error:", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to upload media",
			})
		}
	}

	complaint := models.Complaint{
		UserID:      user,
		Title:       title,
		Description: description,
		Department:  department,
		Latitude:    latitude,
		Longitude:   longitude,
		ImageURL:    imageURL,
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

func GetAllComplaints(c *fiber.Ctx) error {
	var complaints []models.Complaint
	if err := db.DB.Find(&complaints).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch complaints",
		})
	}

	log.Printf("Fetched %d complaints", len(complaints))

	return c.Status(fiber.StatusOK).JSON(complaints)
}
