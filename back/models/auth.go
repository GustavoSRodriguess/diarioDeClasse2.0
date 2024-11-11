package models

import "golang.org/x/crypto/bcrypt"

type LoginCredentials struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required"`
}

func (p *Professor) CheckPassword(password string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(p.Senha), []byte(password))
    return err == nil
}

func (p *Professor) HashPassword() error {
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(p.Senha), bcrypt.DefaultCost)
    if err != nil {
        return err
    }
    p.Senha = string(hashedPassword)
    return nil
}