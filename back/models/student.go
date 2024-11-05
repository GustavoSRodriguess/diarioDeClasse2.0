// no idea if this is goin to work 
package models

import (
	"gorm.io/gorm"
)

var DB *gorm.DB

type Student struct {
	ID    uint   `json:"id" gorm:"primary_key"`
	Nome  string `json:"nome"`
	Email string `json:"email"`
	Senha string `json:"-"`
}