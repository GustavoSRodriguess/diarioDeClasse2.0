package controllers

import (
    "cadastro-professores/models"
    "net/http"
    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
)

func CriarProfessor(c *gin.Context) {
    var professor models.Professor
    if err := c.ShouldBindJSON(&professor); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(professor.Senha), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao processar senha"})
        return
    }
    professor.Senha = string(hashedPassword)

    if err := models.DB.Create(&professor).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar professor"})
        return
    }

    professor.Senha = "" 
    c.JSON(http.StatusCreated, professor)
}

func ListarProfessores(c *gin.Context) {
    var professores []models.Professor
    if err := models.DB.Preload("Disciplinas").Preload("Turmas").Find(&professores).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao listar professores"})
        return
    }
    c.JSON(http.StatusOK, professores)
}

func BuscarProfessor(c *gin.Context) {
    var professor models.Professor
    id := c.Param("id")

    if err := models.DB.Preload("Disciplinas").Preload("Turmas").First(&professor, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Professor não encontrado"})
        return
    }

    c.JSON(http.StatusOK, professor)
}

func AtualizarProfessor(c *gin.Context) {
    var professor models.Professor
    id := c.Param("id")

    if err := models.DB.First(&professor, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Professor não encontrado"})
        return
    }

    var updateData models.Professor
    if err := c.ShouldBindJSON(&updateData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if updateData.Senha != "" {
        hashedPassword, err := bcrypt.GenerateFromPassword([]byte(updateData.Senha), bcrypt.DefaultCost)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao processar senha"})
            return
        }
        updateData.Senha = string(hashedPassword)
    }

    if err := models.DB.Model(&professor).Updates(updateData).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar professor"})
        return
    }

    c.JSON(http.StatusOK, professor)
}

func DeletarProfessor(c *gin.Context) {
    id := c.Param("id")
    var professor models.Professor

    if err := models.DB.First(&professor, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Professor não encontrado"})
        return
    }

    if err := models.DB.Delete(&professor).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao deletar professor"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Professor removido com sucesso"})
}

func AtribuirDisciplina(c *gin.Context) {
    professorID := c.Param("id")
    var professor models.Professor
    var disciplina models.Disciplina

    if err := c.ShouldBindJSON(&disciplina); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := models.DB.First(&professor, professorID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Professor não encontrado"})
        return
    }

    if err := models.DB.Model(&professor).Association("Disciplinas").Append(&disciplina); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atribuir disciplina"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Disciplina atribuída com sucesso"})
}