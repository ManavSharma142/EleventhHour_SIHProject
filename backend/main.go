package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"server/api"
	"server/auth"
	"server/chatbot"
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

	utils.FRONTEND_URL = os.Getenv("FRONTEND_URL")
	if utils.FRONTEND_URL == "" {
		utils.FRONTEND_URL = "http://localhost:5173"
	}
	utils.BACKEND_URL = os.Getenv("BACKEND_URL")
	if utils.BACKEND_URL == "" {
		utils.BACKEND_URL = "http://localhost:8000"
	}
	utils.PROD = os.Getenv("PROD")
	if utils.PROD == "true" {
		utils.ProdBOOL = true
	} else {
		utils.ProdBOOL = false
	}
	database.DBinit()
	auth.InitGoogleOAuth()

	r := mux.NewRouter()
	r.HandleFunc("/login", auth.Login).Methods("POST")                   //for normal login
	r.HandleFunc("/register", auth.Register).Methods("POST")             //for normal register
	r.HandleFunc("/validate", auth.Validate).Methods("GET")              //for validating JWT token and getting user details
	r.HandleFunc("/google/login", auth.GoogleLogin).Methods("GET")       //for google login
	r.HandleFunc("/google/callback", auth.GoogleCallback).Methods("GET") //for google oauth callback

	r.HandleFunc("/ai/workoutsplits", splitsgen.GenerateWorkoutSplits).Methods("POST") //for generating workout splits using AI
	r.HandleFunc("/workouts/selected", splitsgen.GetUserSelectedSplit).Methods("GET")  //for getting user selected split
	r.HandleFunc("/workouts/select", splitsgen.SelectWorkoutSplit).Methods("POST")     //for selecting a workout split
	r.HandleFunc("/workouts/markdone", splitsgen.MarkDoneProgress).Methods("POST")     //for marking progress (Lock)
	r.HandleFunc("/workouts/progress", splitsgen.GetUserProgress).Methods("GET")       //for getting user progress

	r.HandleFunc("/googlefit", auth.GoogleFitTodayHandler).Methods("GET") //for getting today's Google Fit data

	r.HandleFunc("/flexcoin", api.FlexCoinHandler).Methods("GET") //for getting flexcoin

	r.HandleFunc("/activedays", api.ActiveDaysHandler).Methods("GET") //for getting active days
	r.HandleFunc("/streak", api.StreakHandler).Methods("GET")         //for getting info for streak and heatmap

	r.HandleFunc("/wss/chatbot", chatbot.HandleChatbot) //for chatbot

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
