package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"server/auth"
	"server/database"
	"server/router"
	"server/splitsgen"
	"server/utils"
	"syscall"
	"time"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func loadEnv() {
	if _, err := os.Stat(".env"); err == nil {
		if err := godotenv.Load(); err != nil {
			log.Println(utils.Red("Warning: Could not load .env file:", err))
		} else {
			log.Println(utils.Green("Loaded environment variables from .env"))
		}
	} else {
		log.Println(utils.Yellow(".env file not found, assuming environment variables are set by the host"))
	}
}

func main() {
	// Load env
	loadEnv()
	utils.MONGODB_USERNAME = os.Getenv("MONGODB_USERNAME")
	utils.MONGODB_PASSWORD = os.Getenv("MONGODB_PASSWORD")
	utils.MONGODB_CLUSTER = os.Getenv("MONGODB_CLUSTER")
	utils.JWT_SECRET = os.Getenv("JWT_SECRET")
	utils.GOOGLE_CLIENT_ID = os.Getenv("GOOGLE_CLIENT_ID")
	utils.GOOGLE_CLIENT_SECRET = os.Getenv("GOOGLE_CLIENT_SECRET")
	utils.GEMINI_API = os.Getenv("GEMINI_API")
	utils.QDRANT_URL = os.Getenv("QDRANT_URL")
	utils.QDRANT_API = os.Getenv("QDRANT_API")

	database.DBinit()
	auth.InitGoogleOAuth()

	r := mux.NewRouter()
	r.HandleFunc("/login", auth.Login).Methods("POST")
	r.HandleFunc("/register", auth.Register).Methods("POST")
	r.HandleFunc("/validate", auth.Validate).Methods("GET")
	r.HandleFunc("/google/login", auth.GoogleLogin).Methods("GET")
	r.HandleFunc("/google/callback", auth.GoogleCallback).Methods("GET")

	r.HandleFunc("/ai/workoutsplits", splitsgen.GenerateWorkoutSplits).Methods("POST")
	r.HandleFunc("/workouts/selected", splitsgen.GetUserSelectedSplit).Methods("GET")
	r.HandleFunc("/workouts/select", splitsgen.SelectWorkoutSplit).Methods("POST")
	r.HandleFunc("/workouts/markdone", splitsgen.MarkDoneProgress).Methods("POST")
	r.HandleFunc("/workouts/progress", splitsgen.GetUserProgress).Methods("GET")

	corsWrappedRouter := router.CorsMiddleware(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	srv := &http.Server{
		Addr:    ":" + port,
		Handler: corsWrappedRouter,
	}

	go func() {
		log.Println(utils.Green("Web Server Started on PORT - ", port))
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server failed to start: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

	<-quit
	log.Println(utils.Yellow("Shutting down server..."))

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println(utils.Green("Server exited properly"))
}
