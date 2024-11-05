package routes

import (
	"cadastro-salas/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(c *gin.Engine) {
	c.POST("/salas", controllers.CriarSala)
	c.GET("/salas", controllers.ListarSalas)
	c.PUT("/salas", controllers.AtualizarSala)
	c.DELETE("/salas/:id", controllers.DeletarSala)
}