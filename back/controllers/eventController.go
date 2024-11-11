package controllers

import (
    "your-project/models" //mudar path
    "net/http"
    "time"
    "github.com/gin-gonic/gin"
)

type EventRequest struct {
    Title       string    `json:"title" binding:"required"`
    Description string    `json:"description"`
    Type        string    `json:"type" binding:"required"`
    StartDate   time.Time `json:"start_date" binding:"required"`
    EndDate     time.Time `json:"end_date"`
    ClassID     *uint     `json:"class_id"`
    Color       string    `json:"color"`
    // campos específicos para avaliações
    Weight      *float64  `json:"weight"`
    MaxScore    *float64  `json:"max_score"`
}

func CriarEvento(c *gin.Context) {
    var req EventRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if !req.EndDate.IsZero() && req.EndDate.Before(req.StartDate) {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Data final não pode ser anterior à data inicial"})
        return
    }

    professorID, _ := c.Get("userID")

    event := models.Event{
        Title:       req.Title,
        Description: req.Description,
        Type:        req.Type,
        StartDate:   req.StartDate,
        EndDate:     req.EndDate,
        ClassID:     req.ClassID,
        Color:       req.Color,
        CreatedBy:   professorID.(uint),
    }

    if req.Type == "avaliacao" {
        if req.Weight == nil || req.MaxScore == nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Peso e nota máxima são obrigatórios para avaliações"})
            return
        }

        assessmentEvent := models.AssessmentEvent{
            Event:    event,
            Weight:   *req.Weight,
            MaxScore: *req.MaxScore,
        }

        if err := models.DB.Create(&assessmentEvent).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar avaliação"})
            return
        }

        c.JSON(http.StatusCreated, assessmentEvent)
        return
    }

    if err := models.DB.Create(&event).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar evento"})
        return
    }

    c.JSON(http.StatusCreated, event)
}

func ListarEventos(c *gin.Context) {
    startDate := c.Query("start_date")
    endDate := c.Query("end_date")
    eventType := c.Query("type")
    classID := c.Query("class_id")

    query := models.DB.Model(&models.Event{}).
        Preload("Class").
        Preload("Professor")

    if startDate != "" {
        query = query.Where("start_date >= ?", startDate)
    }
    if endDate != "" {
        query = query.Where("start_date <= ?", endDate)
    }
    if eventType != "" {
        query = query.Where("type = ?", eventType)
    }
    if classID != "" {
        query = query.Where("class_id = ?", classID)
    }

    var events []models.Event
    if err := query.Find(&events).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar eventos"})
        return
    }

    c.JSON(http.StatusOK, events)
}

func BuscarEvento(c *gin.Context) {
    id := c.Param("id")
    var event models.Event

    if err := models.DB.Preload("Class").
        Preload("Professor").
        First(&event, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Evento não encontrado"})
        return
    }

    c.JSON(http.StatusOK, event)
}

func AtualizarEvento(c *gin.Context) {
    id := c.Param("id")
    var event models.Event

    if err := models.DB.First(&event, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Evento não encontrado"})
        return
    }

    professorID, _ := c.Get("userID")
    if event.CreatedBy != professorID.(uint) {
        c.JSON(http.StatusForbidden, gin.H{"error": "Sem permissão para editar este evento"})
        return
    }

    var req EventRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    event.Title = req.Title
    event.Description = req.Description
    event.StartDate = req.StartDate
    event.EndDate = req.EndDate
    event.ClassID = req.ClassID
    event.Color = req.Color

    if err := models.DB.Save(&event).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar evento"})
        return
    }

    c.JSON(http.StatusOK, event)
}

func DeletarEvento(c *gin.Context) {
    id := c.Param("id")
    var event models.Event

    if err := models.DB.First(&event, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Evento não encontrado"})
        return
    }

    professorID, _ := c.Get("userID")
    if event.CreatedBy != professorID.(uint) {
        c.JSON(http.StatusForbidden, gin.H{"error": "Sem permissão para deletar este evento"})
        return
    }

    if err := models.DB.Delete(&event).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao deletar evento"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Evento deletado com sucesso"})
}