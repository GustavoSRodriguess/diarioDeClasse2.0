package routes

import (
	"cadastro-alunos/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(c *gin.Engine) {
	c.POST("/alunos", controllers.CriarAluno)
	c.GET("/alunos", controllers.ListarAlunos)
	c.PUT("/alunos", controllers.AtualizarAluno)
	c.DELETE("/alunos/:id", controllers.DeletarAluno)
}