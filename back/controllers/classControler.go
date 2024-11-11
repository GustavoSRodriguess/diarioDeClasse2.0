package controllers

import (
	"myapp/models"
	"net/http"
	"github.com/gin-gonic/gin"
)

func CriarClasse(c *gin.Context) {
	var classe models.Class
	if err := c.ShouldBindJSON(&classe); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var professor models.Professor
	if err := models.DB.First(&professor, classe.ProfessorID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Professor não encontrado"})
		return
	}

	if err := models.DB.Create(&classe).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar classe"})
		return
	}

	c.JSON(http.StatusCreated, classe)
}

func ListarClasses(c *gin.Context) {
	var classes []models.Class
	
	result := models.DB.
		Preload("Professor").
		Preload("Students").
		Find(&classes)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao listar classes"})
		return
	}

	c.JSON(http.StatusOK, classes)
}

func BuscarClasse(c *gin.Context) {
	id := c.Param("id")
	var classe models.Class

	result := models.DB.
		Preload("Professor").
		Preload("Students").
		Preload("Grades").
		First(&classe, id)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Classe não encontrada"})
		return
	}

	c.JSON(http.StatusOK, classe)
}

func AtualizarClasse(c *gin.Context) {
	id := c.Param("id")
	var classe models.Class

	if err := models.DB.First(&classe, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Classe não encontrada"})
		return
	}

	if err := c.ShouldBindJSON(&classe); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := models.DB.Save(&classe).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar classe"})
		return
	}

	c.JSON(http.StatusOK, classe)
}

func DeletarClasse(c *gin.Context) {
	id := c.Param("id")
	var classe models.Class

	if err := models.DB.First(&classe, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Classe não encontrada"})
		return
	}

	if err := models.DB.Model(&classe).Association("Students").Clear(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao remover associações"})
		return
	}

	if err := models.DB.Delete(&classe).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao deletar classe"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Classe deletada com sucesso"})
}

func AdicionarAluno(c *gin.Context) {
	classID := c.Param("id")
	var classe models.Class
	var student models.Student

	type StudentRequest struct {
		StudentID uint `json:"student_id" binding:"required"`
	}
	var req StudentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := models.DB.First(&classe, classID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Classe não encontrada"})
		return
	}

	if err := models.DB.First(&student, req.StudentID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Aluno não encontrado"})
		return
	}

	if err := models.DB.Model(&classe).Association("Students").Append(&student); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao adicionar aluno"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Aluno adicionado com sucesso"})
}
