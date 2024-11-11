// no idea if this is goin to work 
// pior que nem sei se algum aluno teria acesso a esse sistema 
package models

import (
	"gorm.io/gorm"
)

var DB *gorm.DB

type Student struct {
    ID        uint      `json:"id" gorm:"primary_key"`
    Name      string    `json:"name" binding:"required"`
    Email     string    `json:"email" binding:"required,email" gorm:"unique"`
    Password  string    `json:"-" binding:"required,min=6"`
    Classes   []Class   `json:"classes" gorm:"many2many:class_students;"`
    Grades    []Grade   `json:"grades" gorm:"foreignKey:StudentID"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}