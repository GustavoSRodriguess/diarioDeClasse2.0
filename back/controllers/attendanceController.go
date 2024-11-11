package controllers

import (
    "net/http"
    "time"
    "errors"
    "your-project/models" // mudar o path
    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
)

type AttendanceRequest struct {
    StudentIDs []uint    `json:"student_ids" binding:"required"`
    ClassID    uint      `json:"class_id" binding:"required"`
    Date       time.Time `json:"date" binding:"required"`
    Present    bool      `json:"present"`
    Notes      string    `json:"notes"`
}

type AttendanceResponse struct {
    ID        uint      `json:"id"`
    StudentID uint      `json:"student_id"`
    ClassID   uint      `json:"class_id"`
    Date      time.Time `json:"date"`
    Present   bool      `json:"present"`
    Notes     string    `json:"notes"`
    Student   struct {
        ID   uint   `json:"id"`
        Name string `json:"name"`
    } `json:"student"`
}

func MarcarPresenca(c *gin.Context) {
    var req AttendanceRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if req.Date.After(time.Now()) {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Não é possível registrar presença para datas futuras"})
        return
    }

    var class models.Class
    if err := models.DB.First(&class, req.ClassID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Classe não encontrada"})
        return
    }

    var createdRecords []models.Attendance
    for _, studentID := range req.StudentIDs {
        var student models.Student
        err := models.DB.First(&student, studentID).Error
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{
                "error": "Aluno não encontrado",
                "student_id": studentID,
            })
            return
        }

        var existingAttendance models.Attendance
        result := models.DB.Where("student_id = ? AND class_id = ? AND date = ?", 
            studentID, req.ClassID, req.Date).First(&existingAttendance)

        if result.Error == nil {
            existingAttendance.Present = req.Present
            existingAttendance.Notes = req.Notes
            models.DB.Save(&existingAttendance)
            createdRecords = append(createdRecords, existingAttendance)
        } else if errors.Is(result.Error, gorm.ErrRecordNotFound) {
            record := models.Attendance{
                StudentID: studentID,
                ClassID:   req.ClassID,
                Date:      req.Date,
                Present:   req.Present,
                Notes:     req.Notes,
            }
            models.DB.Create(&record)
            createdRecords = append(createdRecords, record)
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao verificar registro existente"})
            return
        }
    }

    c.JSON(http.StatusOK, gin.H{
        "message": "Presenças registradas com sucesso",
        "records": createdRecords,
    })
}

func ListarPresencas(c *gin.Context) {
    classID := c.Param("class_id")
    date := c.Query("date")

    var attendances []models.Attendance
    query := models.DB.Where("class_id = ?", classID).
        Preload("Student")

    if date != "" {
        query = query.Where("date = ?", date)
    }

    if err := query.Find(&attendances).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar presenças"})
        return
    }

    var response []AttendanceResponse
    for _, attendance := range attendances {
        resp := AttendanceResponse{
            ID:        attendance.ID,
            StudentID: attendance.StudentID,
            ClassID:   attendance.ClassID,
            Date:      attendance.Date,
            Present:   attendance.Present,
            Notes:     attendance.Notes,
        }
        resp.Student.ID = attendance.Student.ID
        resp.Student.Name = attendance.Student.Nome
        response = append(response, resp)
    }

    c.JSON(http.StatusOK, response)
}

func BuscarPresencasAluno(c *gin.Context) {
    studentID := c.Param("student_id")
    classID := c.Query("class_id")

    query := models.DB.Where("student_id = ?", studentID)
    
    if classID != "" {
        query = query.Where("class_id = ?", classID)
    }

    var attendances []models.Attendance
    if err := query.Find(&attendances).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar presenças"})
        return
    }

    totalAulas := len(attendances)
    presencas := 0
    for _, att := range attendances {
        if att.Present {
            presencas++
        }
    }

    frequencia := 0.0
    if totalAulas > 0 {
        frequencia = float64(presencas) / float64(totalAulas) * 100
    }

    c.JSON(http.StatusOK, gin.H{
        "attendances": attendances,
        "statistics": gin.H{
            "total_aulas": totalAulas,
            "presencas": presencas,
            "faltas": totalAulas - presencas,
            "frequencia": frequencia,
        },
    })
}

func AtualizarPresenca(c *gin.Context) {
    id := c.Param("id")
    
    var attendance models.Attendance
    if err := models.DB.First(&attendance, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Registro não encontrado"})
        return
    }

    var updateData struct {
        Present bool   `json:"present"`
        Notes   string `json:"notes"`
    }

    if err := c.ShouldBindJSON(&updateData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    attendance.Present = updateData.Present
    attendance.Notes = updateData.Notes

    if err := models.DB.Save(&attendance).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar presença"})
        return
    }

    c.JSON(http.StatusOK, attendance)
}