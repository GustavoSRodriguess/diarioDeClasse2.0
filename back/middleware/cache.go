func CacheMiddleware(duration time.Duration) gin.HandlerFunc {
    return func(c *gin.Context) {
        key := c.Request.URL.String()
        
        if cached, found := cache.Get(key); found {
            c.JSON(http.StatusOK, cached)
            c.Abort()
            return
        }

        c.Next()

        if c.Writer.Status() == http.StatusOK {
            cache.Set(key, c.Get("response"), duration)
        }
    }
}