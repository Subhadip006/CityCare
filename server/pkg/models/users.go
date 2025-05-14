package models

import "time"

type Role string

const (
	CitizenRole Role = "citizen"
	OfficerRole Role = "officer"
	AdminRole   Role = "admin"
)

type User struct {
	ID        uint   `gorm:"primaryKey"`
	Username  string `gorm:"unique;not null"`
	Email     string `gorm:"unique;not null"`
	Password  string `gorm:"not null"`
	Role      Role   `gorm:"type:varchar(20);not null"`
	CreatedAt time.Time
}
