package handlers

import (
	"errors"
	"log"
	"strconv"

	"github.com/Subhadip006/CityCare/pkg/db"
	"github.com/Subhadip006/CityCare/pkg/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func DeleteComplaint(c *fiber.Ctx) error {
	idParam := c.Params("id")

	idUint64, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid complaint id",
		})
	}
	complaintID := uint(idUint64)

	var complaint models.Complaint

	err = db.DB.Transaction(func(tx *gorm.DB) error {

		if err := tx.First(&complaint, "id = ?", complaintID).Error; err != nil {
			return err
		}
		res := tx.Unscoped().Where("complaint_id = ?", complaint.ID).Delete(&models.ComplaintMedia{})
		if res.Error != nil {
			return res.Error
		}

		if err := tx.Unscoped().Delete(&complaint).Error; err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "Complaint not found",
			})
		}
		log.Printf("error deleting complaint id=%s: %v", idParam, err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to delete complaint",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Complaint deleted successfully",
	})
}
