package models

import "time"

type ComplaintStatus string

const (
	StatusPending ComplaintStatus = "pending"
	statusDone    ComplaintStatus = "resolved"
)

type Complaint struct {
	ID          int             `gorm:"primaryKey"`
	Title       string          `gorm:"not null"`
	Description string          `gorm:"not null"`
	Status      ComplaintStatus `gorm:"type:varchar(20);default:'pending';not null"`
	Anonymous   bool            `gorm:"default:false; not null"`
	UserID      int             `gorm:"not null"`

	CreatedAt time.Time
}
