package models

import (
    "time"
    "gorm.io/gorm"
)

type Professor struct {
    ID        uint      `json:"id" gorm:"primary_key"`
    Nome      string    `json:"nome" binding:"required"`
    Email     string    `json:"email" binding:"required,email" gorm:"unique"`
    Senha     string    `json:"-" binding:"required,min=6"`
    Disciplinas []Disciplina `json:"disciplinas" gorm:"many2many:professor_disciplinas;"`
    Turmas    []Turma    `json:"turmas" gorm:"many2many:professor_turmas;"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
}

type Disciplina struct {
    ID        uint      `json:"id" gorm:"primary_key"`
    Nome      string    `json:"nome" binding:"required"`
    Codigo    string    `json:"codigo" binding:"required" gorm:"unique"`
    Professores []Professor `json:"professores" gorm:"many2many:professor_disciplinas;"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
}

type Turma struct {
    ID         uint      `json:"id" gorm:"primary_key"`
    Nome       string    `json:"nome" binding:"required"`
    Periodo    string    `json:"periodo" binding:"required"`
    Ano        int       `json:"ano" binding:"required"`
    Professores []Professor `json:"professores" gorm:"many2many:professor_turmas;"`
    Alunos     []Aluno    `json:"alunos"`
    CreatedAt  time.Time  `json:"created_at"`
    UpdatedAt  time.Time  `json:"updated_at"`
}