package handlers

import (
	"fmt"
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
	fmt.Println("LatitudeStr:", latitudeStr)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid Longitude value",
		})
	}

	if userID == nil {
		fmt.Println("userID is nil")
	} else {
		fmt.Printf("userID value: %v, type: %T\n", userID, userID)
	}

	user, ok := userID.(uint)

	fmt.Println(user)

	if !ok {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid User",
		})
	}

	var complaint models.Complaint

	complaint.UserID = uint(user)
	complaint.Title = title
	complaint.Description = description
	complaint.Department = department
	complaint.Latitude = latitude
	complaint.Longitude = longitude

	err = db.DB.Create(&complaint).Error

	if err != nil {
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
		c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "unable to fetch complaints",
		})
	}

	return c.Status(fiber.StatusOK).JSON(complaints)
}

func GetComplaintsByDepartment(c *fiber.Ctx) error {
	userID := c.Locals("user_id")

	uid, ok := userID.(uint)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid user ID",
		})
	}

	var officer models.Officer
	if err := db.DB.Where("user_id = ?", uid).First(&officer).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Officer profile not found",
		})
	}
	var complaints []models.Complaint
	if err := db.DB.Where("department = ?", officer.Department).Find(&complaints).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch complaints",
		})
	}

	return c.JSON(complaints)
}
