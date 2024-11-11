package models

import (
    "time"
)

type Event struct {
    ID          uint      `json:"id" gorm:"primary_key"`
    Title       string    `json:"title" binding:"required"`
    Description string    `json:"description"`
    Type        string    `json:"type" binding:"required"` // avaliacao, feriado, reuniao, aula, evento
    StartDate   time.Time `json:"start_date" binding:"required"`
    EndDate     time.Time `json:"end_date"`
    ClassID     *uint     `json:"class_id"` // opcional, para eventos específicos de uma turma
    Class       *Class    `json:"class,omitempty" gorm:"foreignKey:ClassID"`
    Color       string    `json:"color"`     // para personalização visual
    CreatedBy   uint      `json:"created_by"`
    Professor   Professor `json:"professor" gorm:"foreignKey:CreatedBy"`
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}

type AssessmentEvent struct {
    Event
    Weight    float64 `json:"weight"`
    MaxScore  float64 `json:"max_score"`
}