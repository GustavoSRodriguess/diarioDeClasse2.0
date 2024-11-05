package controllers

import (
	"cadastro-alunos/models"
	"net/http"
	"github.com/gin-gonic/gin"
)

func CriarAluno(c *gin.Context) {
	var aluno models.Aluno
	if err := c.ShouldBindJSON(&aluno); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.Create(&aluno)
	c.JSON(http.StatusOK, gin.H{"message": "Aluno criado com sucesso!"})
}

func ListarAlunos(c *gin.Context) {
	var alunos []models.Aluno
	models.DB.Find(&alunos)
	c.JSON(http.StatusOK, alunos)
}

func AtualizarAluno(c *gin.Context) {
	var aluno models.Aluno
	if err := c.ShouldBindJSON(&aluno); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.Save(&aluno)
	c.JSON(http.StatusOK, gin.H{"message": "Aluno atualizado com sucesso!"})
}

func DeletarAluno(c *gin.Context) {
	var aluno models.Aluno
	id := c.Param("id")
	models.DB.Where("id = ?", id).Find(&aluno)
	models.DB.Delete(&aluno)
	c.JSON(http.StatusOK, gin.H{"message": "Aluno deletado com sucesso!"})
}