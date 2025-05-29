package models

import "gorm.io/gorm"

type Officer struct {
	gorm.Model
	Username   string `gorm:"not null"`
	Email      string `gorm:"unique;not null"`
	Password   string `gorm:"not null" json:"password,omitempty"`
	Department string `gorm:"not null"`
}
