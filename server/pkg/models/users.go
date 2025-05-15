package models

import (
	"gorm.io/gorm"
)

type Role string

const (
	CitizenRole Role = "citizen"
	OfficerRole Role = "officer"
	AdminRole   Role = "admin"
)

type User struct {
	gorm.Model
	Username string `gorm:"not null"`
	Email    string `gorm:"unique;not null"`
	Password string `gorm:"not null" json:"password,omitempty"`
	Role     Role   `gorm:"type:varchar(20);not null"`
}
