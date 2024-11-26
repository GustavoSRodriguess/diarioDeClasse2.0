package routes

import (
	"cadastro-professores/controllers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(router *gin.Engine, db *gorm.DB) {
	controller := &controllers.Controller{DB: db}

	// Rotas de Professor
	professorGroup := router.Group("/professores")
	{
		professorGroup.POST("", controller.CriarProfessor)
		professorGroup.GET("", controller.ListarProfessores)
		professorGroup.GET("/:id", controller.ObterProfessorPorID)
		professorGroup.PUT("/:id", controller.AtualizarProfessor)
		professorGroup.DELETE("/:id", controller.DeletarProfessor)
	}

	// Rotas de Turma
	turmaGroup := router.Group("/turmas")
	{
		turmaGroup.POST("", controller.CriarTurma)
		turmaGroup.GET("", controller.ListarTurmas)
		turmaGroup.GET("/:id", controller.ObterTurmaPorID)
		turmaGroup.PUT("/:id", controller.AtualizarTurma)
		turmaGroup.DELETE("/:id", controller.DeletarTurma)
		turmaGroup.POST("/:id/alunos", controller.AdicionarAluno)
		turmaGroup.POST("/:id/professor", controller.AtribuirProfessorTurma)
		turmaGroup.POST("/:id/presencas", controller.RegistrarPresencasEmLote)
	}

	// Rotas de Aluno
	alunoGroup := router.Group("/alunos")
	{
		alunoGroup.GET("", controller.ListarAlunos)
		alunoGroup.GET("/:id", controller.ObterAlunoPorID)
		alunoGroup.PUT("/:id", controller.AtualizarAluno)
		alunoGroup.DELETE("/:id", controller.DeletarAluno)
		alunoGroup.POST("/:id/presenca", controller.RegistrarPresenca)
	}
}
