package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username   string `gorm:"not null"`
	Email      string `gorm:"unique;not null"`
	Password   string `gorm:"not null" json:"password,omitempty"`
	Role       string `gorm:"type:varchar(20);not null"`
	IsVerified bool   `gorm:"default:false"`
}
