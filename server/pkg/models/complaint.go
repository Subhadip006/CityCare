// models/complaint.go
package models

import "gorm.io/gorm"

type ComplaintStatus string

const (
	StatusPending  ComplaintStatus = "pending"
	StatusResolved ComplaintStatus = "resolved"
)

type Complaint struct {
	gorm.Model
	Title       string          `gorm:"not null"`
	Description string          `gorm:"not null"`
	Department  string          `gorm:"not null"`
	Status      ComplaintStatus `gorm:"type:varchar(20);default:'pending';not null"`
	Anonymous   bool            `gorm:"default:false;not null"`
	UserID      uint            `gorm:"not null"`
	Latitude    float64
	Longitude   float64

	Media []ComplaintMedia `gorm:"foreignKey:ComplaintID"`
}
