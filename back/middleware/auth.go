package middleware

import (
    "myapp/utils"
    "strings"
    "net/http"
    "github.com/gin-gonic/gin"
)

func AuthRequired() gin.HandlerFunc {
    return func(c *gin.Context) {
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Autorização necessária"})
            c.Abort()
            return
        }

        parts := strings.SplitN(authHeader, " ", 2)
        if !(len(parts) == 2 && parts[0] == "Bearer") {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Formato de token inválido"})
            c.Abort()
            return
        }

        claims, err := utils.ValidateToken(parts[1])
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido"})
            c.Abort()
            return
        }

        c.Set("userID", claims.UserID)
        c.Set("userEmail", claims.Email)
        c.Set("userRole", claims.Role)

        c.Next()
    }
}

func RoleRequired(roles ...string) gin.HandlerFunc {
    return func(c *gin.Context) {
        userRole, exists := c.Get("userRole")
        if !exists {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuário não autenticado"})
            c.Abort()
            return
        }

        roleStr := userRole.(string)
        authorized := false
        for _, role := range roles {
            if roleStr == role {
                authorized = true
                break
            }
        }

        if !authorized {
            c.JSON(http.StatusForbidden, gin.H{"error": "Acesso não autorizado"})
            c.Abort()
            return
        }

        c.Next()
    }
}