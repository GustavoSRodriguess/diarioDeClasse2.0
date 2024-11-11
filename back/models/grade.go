package models

import (
    "time"
    "gorm.io/gorm"
)

type Grade struct {
    ID        uint      `json:"id" gorm:"primary_key"`
    StudentID uint      `json:"student_id"`
    ClassID   uint      `json:"class_id"`
    Type      string    `json:"type" binding:"required"`  // prova, trabalho, etc.
    Value     float64   `json:"value" binding:"required,min=0,max=10"`
    Weight    float64   `json:"weight" binding:"required"`
    Date      time.Time `json:"date"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}