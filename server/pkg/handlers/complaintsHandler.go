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
	if title == "" || department == "" || description == "" || longitudeStr == "" || latitudeStr == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Title, Department, Description, Latitude and Longitude are required",
		})
	}
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
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	form, err := c.MultipartForm()
	if err == nil && form.File != nil && len(form.File["media"]) > 0 {
		files := form.File["media"]

		for _, file := range files {
			imageURL, err := utils.UploadToCloudinary(file)
			if err != nil {
				log.Println("Cloudinary upload error:", err)
				continue
			}

			media := models.ComplaintMedia{
				ComplaintID: complaint.ID,
				ImageURL:    imageURL,
			}

			if err := db.DB.Create(&media).Error; err != nil {
				log.Println("Failed to save media:", err)
				continue
			}
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Complaint submitted successfully",
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
	officerID := c.Params("id")

	var officer models.Officer
	if err := db.DB.First(&officer, officerID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Officer profile not found",
		})
	}

	var complaints []models.Complaint
	if err := db.DB.Preload("Media").Where("LOWER(department) = LOWER(?)", officer.Department).Find(&complaints).Error; err != nil {
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

func SolveComplaint(c *fiber.Ctx) error {
	officerID := c.Locals("user_id")
	officer, ok := officerID.(uint)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid officer authentication",
		})
	}

	complaintIDStr := c.Params("id")
	complaintID, err := strconv.ParseUint(complaintIDStr, 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid complaint ID",
		})
	}

	var complaint models.Complaint
	if err := db.DB.First(&complaint, uint(complaintID)).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Complaint not found",
		})
	}

	if complaint.Status == "Solved" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Complaint is already solved",
		})
	}
	complaint.Status = "Solved"

	if err := db.DB.Save(&complaint).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update complaint status",
		})
	}

	log.Printf("Complaint ID %d marked as solved by officer ID %d", complaintID, officer)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":   "Complaint marked as solved successfully",
		"complaint": complaint,
	})
}
