package models

type LessonPlan struct {
    ID          uint   `json:"id" gorm:"primary_key"`
    ClassID     uint   `json:"class_id"`
    Title       string `json:"title"`
    Description string `json:"description"`
    Date        time.Time `json:"date"`
    Objectives  string    `json:"objectives"`
    Resources   string    `json:"resources"`
    Activities  string    `json:"activities"`
    Homework    string    `json:"homework"`
    Status      string    `json:"status"` // planejado, Executado, Cancelado
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}