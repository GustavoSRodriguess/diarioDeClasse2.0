package controllers

import (
    "myapp/models"
    "myapp/utils"
    "net/http"
    "github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
    var credentials models.LoginCredentials
    if err := c.ShouldBindJSON(&credentials); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var professor models.Professor
    if err := models.DB.Where("email = ?", credentials.Email).First(&professor).Error; err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Credenciais inválidas"})
        return
    }

    if !professor.CheckPassword(credentials.Password) {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Credenciais inválidas"})
        return
    }

    token, err := utils.GenerateToken(professor.ID, professor.Email, "professor")
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao gerar token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "token": token,
        "user": gin.H{
            "id": professor.ID,
            "email": professor.Email,
            "nome": professor.Nome,
        },
    })
}