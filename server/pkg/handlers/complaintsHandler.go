package handlers

import (
	"fmt"

	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/gofiber/fiber/v2"
)

func ComplaintSubmit(c *fiber.Ctx) error {

	userID := c.Locals("user_id")

	title := c.FormValue("Title")
	department := c.FormValue("Department")

	description := c.FormValue("Description")

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

	err := db.DB.Create(&complaint).Error

	if err != nil {
		c.Status(fiber.ErrBadRequest.Code).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Complaint Uploaded Successfully",
	})

}
