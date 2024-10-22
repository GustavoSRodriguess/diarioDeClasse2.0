package controllers

import (
	"cadastro-professores/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CriarProfessor(c *gin.Context) {
	var professor models.Professor
	if err := c.ShouldBindJSON(&professor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.Create(&professor)
	c.JSON(http.StatusOK, gin.H{"message": "Professor criado com sucesso!"})
}

func ListarProfessores(c *gin.Context) {
	var professores []models.Professor
	models.DB.Find(&professores)
	c.JSON(http.StatusOK, professores)
}
