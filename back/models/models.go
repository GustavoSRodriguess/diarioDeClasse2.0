package models

import (
	"gorm.io/gorm"
)

var DB *gorm.DB

type Professor struct {
	ID     uint    `json:"id" gorm:"primary_key"`
	Nome   string  `json:"nome"`
	Email  string  `json:"email"`
	Senha  string  `json:"-"`
	Turmas []Turma `json:"turmas" gorm:"foreignKey:ProfessorID"`
}

type Turma struct {
	ID          uint      `json:"id" gorm:"primary_key"`
	Nome        string    `json:"nome"`
	Codigo      string    `json:"codigo"`
	ProfessorID uint      `json:"professorId"`
	Professor   Professor `json:"professor" gorm:"foreignKey:ProfessorID"`
	Alunos      []Aluno   `json:"alunos" gorm:"foreignKey:TurmaID"`
}

type Aluno struct {
	ID        uint   `json:"id" gorm:"primary_key"`
	Nome      string `json:"nome"`
	NumFaltas int    `json:"numFaltas"`
	Status    int    `json:"status"`
	TurmaID   uint   `json:"turmaId"`
}
