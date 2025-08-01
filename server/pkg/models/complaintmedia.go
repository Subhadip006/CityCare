package models

import "gorm.io/gorm"

type ComplaintMedia struct {
	gorm.Model
	ComplaintID uint `gorm:"not null"`
	ImageURL    string
}
