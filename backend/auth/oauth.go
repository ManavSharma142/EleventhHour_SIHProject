package auth

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"server/database"
	"server/utils" // Assuming this package provides GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET

	"github.com/google/uuid"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

// UserData represents the user information returned from Google's API.
type UserData struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Name          string `json:"name"`
	GivenName     string `json:"given_name"`
	FamilyName    string `json:"family_name"`
	Picture       string `json:"picture"`
	Locale        string `json:"locale"`
}

// googleOAuthConfig holds the Google OAuth2 configuration.
var googleOAuthConfig *oauth2.Config

// InitGoogleOAuth initializes the Google OAuth2 configuration.
func InitGoogleOAuth() {
	googleOAuthConfig = &oauth2.Config{
		RedirectURL:  "http://localhost:8000/google/callback",
		ClientID:     utils.GOOGLE_CLIENT_ID,
		ClientSecret: utils.GOOGLE_CLIENT_SECRET,
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		},
		Endpoint: google.Endpoint,
	}
}

// GoogleLogin handles the redirect to Google's login page.
// The handler must have the signature http.HandlerFunc: func(w http.ResponseWriter, r *http.Request)
func GoogleLogin(w http.ResponseWriter, r *http.Request) {
	// The state string is a CSRF token. It should be unique per user.
	// In a real app, generate and store it securely (e.g., in a cookie or session).
	state := "randomstate"
	url := googleOAuthConfig.AuthCodeURL(state)

	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// GoogleCallback handles the callback from Google after a successful login.
// GoogleCallback handles the callback from Google after a successful login.
func GoogleCallback(w http.ResponseWriter, r *http.Request) {
	state := r.URL.Query().Get("state")
	if state != "randomstate" {
		http.Error(w, "States don't match.", http.StatusUnauthorized)
		return
	}

	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "Authorization code not provided.", http.StatusBadRequest)
		return
	}

	// Exchange the authorization code for an OAuth2 token.
	token, err := googleOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		log.Printf("Code-Token Exchange Failed: %v", err)
		http.Error(w, "Failed to exchange authorization code for a token.", http.StatusInternalServerError)
		return
	}

	// Fetch user info
	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		log.Printf("User Data Fetch Failed: %v", err)
		http.Error(w, "Failed to fetch user data.", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	var userData UserData
	if err := json.NewDecoder(resp.Body).Decode(&userData); err != nil {
		log.Printf("JSON Unmarshaling Failed: %v", err)
		http.Error(w, "Failed to parse user data.", http.StatusInternalServerError)
		return
	}

	// Generate user + JWT

	username, err := database.GetUserEmail(userData.Email)
	if err == nil {
		tokenJWT := utils.GenerateJWTSecret(username)
		http.SetCookie(w, &http.Cookie{
			Name:     "authToken",
			Value:    tokenJWT,
			Path:     "/",
			HttpOnly: true,
			Secure:   false,
			SameSite: http.SameSiteLaxMode,
		})
		http.Redirect(w, r, "http://localhost:5173/app", http.StatusFound)
		return
	}
	username = utils.GenerateUID(userData.Name)
	err = database.AddUser(username, uuid.New().String(), token.TokenType, userData.Email)
	if err != nil {
		log.Printf("Error adding user to database: %v", err)
		http.Error(w, "Failed to add user to database.", http.StatusInternalServerError)
		return
	}
	tokenJWT := utils.GenerateJWTSecret(username)

	// ✅ Set JWT as HttpOnly cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "authToken",
		Value:    tokenJWT,
		Path:     "/",
		HttpOnly: true,  // not accessible by JS
		Secure:   false, // set to true in production with HTTPS
		SameSite: http.SameSiteLaxMode,
	})

	// Redirect user back to frontend (no token in URL now)
	http.Redirect(w, r, "http://localhost:5173/app", http.StatusFound)
}
