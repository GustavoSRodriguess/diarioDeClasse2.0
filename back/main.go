package main

import (
	"cadastro-professores/models"
	"cadastro-professores/routes"
	"fmt"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Configurar as credenciais de conexão com o PostgreSQL
	dsn := "<sua url>"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrar o modelo e associar o banco ao pacote models
	database.AutoMigrate(&models.Professor{})
	models.DB = database

	// Iniciar o servidor Gin
	r := gin.Default()

	// Configurar rotas
	routes.SetupRoutes(r)

	// Rodar o servidor
	fmt.Println("Servidor rodando na porta 8080...")
	r.Run(":8080")
}
