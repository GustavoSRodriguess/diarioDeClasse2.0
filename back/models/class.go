package models

import (
    "time"
    "gorm.io/gorm"
)

type Class struct {
    ID          uint      `json:"id" gorm:"primary_key"`
    Name        string    `json:"name" binding:"required"`
    Period      string    `json:"period" binding:"required"` // manha, Tarde, Noite
    Year        int       `json:"year" binding:"required"`   // ano letivo
    ProfessorID uint      `json:"professor_id"`
    Professor   Professor `json:"professor" gorm:"foreignKey:ProfessorID"`
    Students    []Student `json:"students" gorm:"many2many:class_students;"`
    Grades      []Grade   `json:"grades" gorm:"foreignKey:ClassID"`
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}