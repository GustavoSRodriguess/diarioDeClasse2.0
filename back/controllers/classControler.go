package controllers

import (
	"cadastro-salas/models"
	"net/http"
	"github.com/gin-gonic/gin"
)

func CriarClasse(c *gin.Context) {
	var classe models.Classe
	if err := c.ShouldBindJSON(&classe); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.Create(&classe)
	c.JSON(http.StatusOK, gin.H{"message": "Classe criada com sucesso!"})
}

func ListarClasses(c *gin.Context) {
	var classes []models.Classe
	models.DB.Find(&classes)
	c.JSON(http.StatusOK, classes)
}

func AtualizarClasse(c *gin.Context) {
	var classe models.Classe
	if err := c.ShouldBindJSON(&classe); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.Save(&classe)
	c.JSON(http.StatusOK, gin.H{"message": "Classe atualizada com sucesso!"})
}

func DeletarClasse(c *gin.Context) {
	var classe models.Classe
	id := c.Param("id")
	models.DB.Where("id = ?", id).Find(&classe)
	models.DB.Delete(&classe)
	c.JSON(http.StatusOK, gin.H{"message": "Classe deletada com sucesso!"})
}
