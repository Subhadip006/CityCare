package models

import "gorm.io/gorm"

type Admin struct {
	gorm.Model
	Username string `gorm:"unique;not null"`
	UniqueID int    `gorm:"unique;not null"`
}
