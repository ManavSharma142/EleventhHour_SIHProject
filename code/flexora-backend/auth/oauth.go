package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"server/database"
	"server/utils"

	"github.com/google/uuid"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

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

var googleOAuthConfig *oauth2.Config

func InitGoogleOAuth() {
	googleOAuthConfig = &oauth2.Config{
		RedirectURL:  utils.BACKEND_URL + "/google/callback",
		ClientID:     utils.GOOGLE_CLIENT_ID,
		ClientSecret: utils.GOOGLE_CLIENT_SECRET,
		Scopes: []string{
			"openid",
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/fitness.activity.read",
			"https://www.googleapis.com/auth/fitness.body.read",
		},
		Endpoint: google.Endpoint,
	}
}

func GoogleLogin(w http.ResponseWriter, r *http.Request) {
	state := uuid.New().String() // ✅ unique CSRF state
	http.SetCookie(w, &http.Cookie{
		Name:     "oauthstate",
		Value:    state,
		Path:     "/",
		HttpOnly: true,
	})

	url := googleOAuthConfig.AuthCodeURL(
		state,
		oauth2.AccessTypeOffline,
		oauth2.SetAuthURLParam("prompt", "consent"),
	)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func GoogleCallback(w http.ResponseWriter, r *http.Request) {
	stateCookie, err := r.Cookie("oauthstate")
	if err != nil || r.URL.Query().Get("state") != stateCookie.Value {
		http.Error(w, "Invalid state parameter", http.StatusUnauthorized)
		return
	}

	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "Authorization code missing", http.StatusBadRequest)
		return
	}

	token, err := googleOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		log.Printf("Code exchange failed: %v", err)
		http.Error(w, "Token exchange failed", http.StatusInternalServerError)
		return
	}

	// Fetch user profile
	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		log.Printf("User info request failed: %v", err)
		http.Error(w, "Failed to fetch user info", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	var userData UserData
	if err := json.NewDecoder(resp.Body).Decode(&userData); err != nil {
		log.Printf("Failed to decode user info: %v", err)
		http.Error(w, "Invalid user info response", http.StatusInternalServerError)
		return
	}

	// Check if user exists
	username, err := database.GetUserEmail(userData.Email)
	if err == nil {
		// ✅ Existing user → issue JWT
		tokenJWT := utils.GenerateJWTSecret(username)
		redirectURL := fmt.Sprintf("%s/oauth-success#token=%s&username=%s", utils.FRONTEND_URL, tokenJWT, username)
		http.Redirect(w, r, redirectURL, http.StatusFound)
		return
	}

	// New user → save to DB (store refresh token too)
	username = utils.GenerateUID(userData.Name)
	err = database.AddUser(
		username,
		uuid.New().String(), // random password placeholder
		token.RefreshToken,  // ✅ store refresh, not just access
		userData.Email,
		userData.Name,
		"",
		"",
		"",
		"",
		userData.Picture,
	)
	if err != nil {
		log.Printf("Failed to add user: %v", err)
		http.Error(w, "User registration failed", http.StatusInternalServerError)
		return
	}

	tokenJWT := utils.GenerateJWTSecret(username)
	redirectURL := fmt.Sprintf("%s/oauth-success#token=%s&username=%s", utils.FRONTEND_URL, tokenJWT, username)
	http.Redirect(w, r, redirectURL, http.StatusFound)
}
