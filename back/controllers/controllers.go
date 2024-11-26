package controllers

import (
	"cadastro-professores/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Controller struct {
	DB *gorm.DB
}

type PresencaAluno struct {
	AlunoID  uint `json:"alunoId"`
	Presente bool `json:"presente"`
}

// Modificar o método ListarProfessores para incluir as turmas
func (tc *Controller) ListarProfessores(c *gin.Context) {
	var professores []models.Professor
	result := tc.DB.Preload("Turmas").Find(&professores)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, professores)
}

// Modificar o método ObterProfessorPorID para incluir as turmas
func (tc *Controller) ObterProfessorPorID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var professor models.Professor
	result := tc.DB.Preload("Turmas").First(&professor, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Professor não encontrado"})
		return
	}

	c.JSON(http.StatusOK, professor)
}

// Modificar o método CriarTurma para incluir o professor
func (tc *Controller) CriarTurma(c *gin.Context) {
	var turma models.Turma
	if err := c.ShouldBindJSON(&turma); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Verificar se o professor existe
	if turma.ProfessorID != 0 {
		var professor models.Professor
		if err := tc.DB.First(&professor, turma.ProfessorID).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Professor não encontrado"})
			return
		}
	}

	result := tc.DB.Create(&turma)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	// Carregar os dados do professor para a resposta
	tc.DB.Preload("Professor").First(&turma, turma.ID)

	c.JSON(http.StatusCreated, turma)
}

// Adicionar um novo método para atribuir professor a uma turma
func (tc *Controller) AtribuirProfessorTurma(c *gin.Context) {
	turmaID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de turma inválido"})
		return
	}

	var dados struct {
		ProfessorID uint `json:"professorId"`
	}

	if err := c.ShouldBindJSON(&dados); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Verificar se a turma existe
	var turma models.Turma
	if err := tc.DB.First(&turma, turmaID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Turma não encontrada"})
		return
	}

	// Verificar se o professor existe
	var professor models.Professor
	if err := tc.DB.First(&professor, dados.ProfessorID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Professor não encontrado"})
		return
	}

	// Atualizar o professor da turma
	turma.ProfessorID = dados.ProfessorID
	if err := tc.DB.Save(&turma).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Carregar os dados atualizados
	tc.DB.Preload("Professor").First(&turma, turma.ID)

	c.JSON(http.StatusOK, turma)
}

func (tc *Controller) RegistrarPresencasEmLote(c *gin.Context) {
	turmaID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de turma inválido"})
		return
	}

	// Verificar se a turma existe
	var turma models.Turma
	if err := tc.DB.First(&turma, turmaID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Turma não encontrada"})
		return
	}

	// Receber a lista de presenças
	var presencas []PresencaAluno
	if err := c.ShouldBindJSON(&presencas); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Criar um mapa para armazenar os resultados do processamento
	resultado := struct {
		Sucesso []uint          `json:"sucessos"`
		Erros   map[uint]string `json:"erros"`
	}{
		Sucesso: make([]uint, 0),
		Erros:   make(map[uint]string),
	}

	// Processar cada presença
	for _, p := range presencas {
		var aluno models.Aluno

		// Verificar se o aluno existe e pertence à turma
		if err := tc.DB.Where("id = ? AND turma_id = ?", p.AlunoID, turmaID).First(&aluno).Error; err != nil {
			resultado.Erros[p.AlunoID] = "Aluno não encontrado ou não pertence a esta turma"
			continue
		}

		// Incrementar faltas se ausente
		if !p.Presente {
			aluno.NumFaltas++
			if err := tc.DB.Save(&aluno).Error; err != nil {
				resultado.Erros[p.AlunoID] = "Erro ao atualizar faltas"
				continue
			}
		}

		resultado.Sucesso = append(resultado.Sucesso, p.AlunoID)
	}

	c.JSON(http.StatusOK, resultado)
}

func (tc *Controller) RegistrarPresenca(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	// Estrutura para receber o status de presença
	var presenca struct {
		Presente bool `json:"presente"`
	}

	if err := c.ShouldBindJSON(&presenca); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Buscar o aluno no banco
	var aluno models.Aluno
	if err := tc.DB.First(&aluno, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Aluno não encontrado"})
		return
	}

	// Incrementar o número de faltas se o aluno estiver ausente
	if !presenca.Presente {
		aluno.NumFaltas++
	}

	// Salvar as alterações no banco
	result := tc.DB.Save(&aluno)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, aluno)
}

// Métodos de Professor
func (tc *Controller) CriarProfessor(c *gin.Context) {
	var professor models.Professor
	if err := c.ShouldBindJSON(&professor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := tc.DB.Create(&professor)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusCreated, professor)
}

func (tc *Controller) AtualizarProfessor(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var professor models.Professor
	if err := tc.DB.First(&professor, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Professor não encontrado"})
		return
	}

	if err := c.ShouldBindJSON(&professor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := tc.DB.Save(&professor)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, professor)
}

func (tc *Controller) DeletarProfessor(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var professor models.Professor
	result := tc.DB.Delete(&professor, id)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Professor não encontrado"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Professor deletado com sucesso"})
}

func (tc *Controller) ListarTurmas(c *gin.Context) {
	var turmas []models.Turma
	result := tc.DB.Preload("Alunos").Find(&turmas)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, turmas)
}

func (tc *Controller) ObterTurmaPorID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var turma models.Turma
	result := tc.DB.Preload("Alunos").First(&turma, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Turma não encontrada"})
		return
	}

	c.JSON(http.StatusOK, turma)
}

func (tc *Controller) AtualizarTurma(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var turma models.Turma
	if err := tc.DB.First(&turma, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Turma não encontrada"})
		return
	}

	if err := c.ShouldBindJSON(&turma); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := tc.DB.Save(&turma)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, turma)
}

func (tc *Controller) DeletarTurma(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var turma models.Turma
	result := tc.DB.Delete(&turma, id)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Turma não encontrada"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Turma deletada com sucesso"})
}

func (tc *Controller) AdicionarAluno(c *gin.Context) {
	turmaID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de turma inválido"})
		return
	}

	var turma models.Turma
	if err := tc.DB.First(&turma, turmaID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Turma não encontrada"})
		return
	}

	var aluno models.Aluno
	if err := c.ShouldBindJSON(&aluno); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	aluno.TurmaID = uint(turmaID)

	result := tc.DB.Create(&aluno)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusCreated, aluno)
}

// Métodos de Aluno (completando o CRUD)
func (tc *Controller) ListarAlunos(c *gin.Context) {
	var alunos []models.Aluno
	result := tc.DB.Find(&alunos)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, alunos)
}

func (tc *Controller) ObterAlunoPorID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var aluno models.Aluno
	result := tc.DB.First(&aluno, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Aluno não encontrado"})
		return
	}

	c.JSON(http.StatusOK, aluno)
}

func (tc *Controller) AtualizarAluno(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var aluno models.Aluno
	if err := tc.DB.First(&aluno, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Aluno não encontrado"})
		return
	}

	if err := c.ShouldBindJSON(&aluno); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := tc.DB.Save(&aluno)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, aluno)
}

func (tc *Controller) DeletarAluno(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var aluno models.Aluno
	result := tc.DB.Delete(&aluno, id)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Aluno não encontrado"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Aluno deletado com sucesso"})
}
