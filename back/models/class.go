// i have no idea if this is going to work

package models

import (
	"gorm.io/gorm"
)

var DB *gorm.DB

type Class struct {
	ID          uint   `json:"id" gorm:"primary_key"`
	Name        string `json:"name"`	
	ProfessorID uint   `json:"professor_id"`
	Professor   Professor
	Students    []Student `gorm:"many2many:student_classes;"`
}