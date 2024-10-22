package routes

import (
	"cadastro-professores/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	router.POST("/professores", controllers.CriarProfessor)
	router.GET("/professores", controllers.ListarProfessores)
}
