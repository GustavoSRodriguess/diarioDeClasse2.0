package routes

import (
    "myapp/controllers"
    "myapp/middleware"
    "github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {

    publuc := r.Group("/api")
    {
        publuc.POST("/login", controllers.Login)
    }

    api := r.Group("/api")
    api.Use(middleware.AuthRequired())
    {
        classes := api.Group("/classes")
        classes.Use(middleware.RoleRequired("professor"))
        {
            classes.POST("/", controllers.CriarClasse)
            classes.GET("/", controllers.ListarClasses)
            classes.GET("/:id", controllers.BuscarClasse)
            classes.PUT("/:id", controllers.AtualizarClasse)
            classes.DELETE("/:id", controllers.DeletarClasse)
            classes.POST("/:id/students", controllers.AdicionarAluno)
        }

        students := api.Group("/students")
        students.Use(middleware.RoleRequired("professor", "admin"))
        {
            students.POST("/", controllers.CriarAluno)
            students.GET("/", controllers.ListarAlunos)
            students.GET("/:id", controllers.BuscarAluno)
            students.PUT("/:id", controllers.AtualizarAluno)
            students.DELETE("/:id", controllers.DeletarAluno)
        }

        grades := api.Group("/grades")
        {
            grades.POST("/", controllers.CriarNota)
            grades.GET("/class/:id", controllers.ListarNotasPorClasse)
            grades.GET("/student/:id", controllers.ListarNotasPorAluno)
        }

        events := r.Group("/events")
        events.Use(middleware.RoleRequired("professor"))
        {
            events.POST("/", controllers.CriarEvento)
            events.GET("/", controllers.ListarEventos)
            events.GET("/:id", controllers.BuscarEvento)
            events.PUT("/:id", controllers.AtualizarEvento)
            events.DELETE("/:id", controllers.DeletarEvento)
        }
    }
}