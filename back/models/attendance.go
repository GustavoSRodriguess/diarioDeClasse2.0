package models

import (
    "time"
)

type Attendance struct {
    ID        uint      `json:"id" gorm:"primary_key"`
    ClassID   uint      `json:"class_id"`
    StudentID uint      `json:"student_id"`
    Date      time.Time `json:"date"`
    Present   bool      `json:"present"`
    Notes     string    `json:"notes"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}