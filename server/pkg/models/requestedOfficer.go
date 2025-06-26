package models

import "gorm.io/gorm"

type RequestedOfficer struct {
	gorm.Model
	Username   string `gorm:"not null" json:"Username"`
	Email      string `gorm:"unique;not null" json:"Email"`
	Password   string `gorm:"not null" json:"Password,omitempty"`
	Department string `gorm:"not null" json:"Department"`
	Role       string `gorm:"not null; default:officer" json:"Role"`
	Phone      string `json:"Phone"`
	Sector     string `json:"Sector"`
	Onboarded  bool   `gorm:"default:false"`
}
