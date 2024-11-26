package main

import (
	"cadastro-professores/models"
	"cadastro-professores/routes"
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Carregar as variáveis de ambiente do arquivo .env
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Erro ao carregar o arquivo .env: %v", err)
	}

	// Construir a string DSN com base nas variáveis de ambiente
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_SSLMODE"),
		os.Getenv("DB_TIMEZONE"))

	// Conectar ao banco de dados
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrar o modelo e associar o banco ao pacote models
	database.AutoMigrate(&models.Professor{})
	database.AutoMigrate(&models.Turma{})
	database.AutoMigrate(&models.Aluno{})
	models.DB = database

	// Iniciar o servidor Gin
	r := gin.Default()

	// Configurar rotas
	routes.SetupRoutes(r, database)

	// Rodar o servidor
	fmt.Println("Servidor rodando na porta 8080...")
	fmt.Println("http://localhost:8080")
	r.Run(":8080")
}
