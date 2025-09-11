package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"server/auth"
	"server/database"
	"server/router"
	"server/utils"

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
	loadEnv()
	utils.MONGODB_USERNAME = os.Getenv("MONGODB_USERNAME")
	utils.MONGODB_PASSWORD = os.Getenv("MONGODB_PASSWORD")
	utils.MONGODB_CLUSTER = os.Getenv("MONGODB_CLUSTER")
	database.DBinit()

	r := mux.NewRouter()
	r.HandleFunc("/login", auth.Login).Methods("POST")
	r.HandleFunc("/register", auth.Register).Methods("POST")
	r.HandleFunc("/validate", auth.Validate).Methods("GET")
	corsWrappedRouter := router.CorsMiddleware(r)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	log.Println(utils.Green("Web Server Started on PORT - ", port))
	err := http.ListenAndServe(":"+port, corsWrappedRouter)
	if err != nil {
		fmt.Println("Server Failed to start!")
		panic(err)
	}
}
