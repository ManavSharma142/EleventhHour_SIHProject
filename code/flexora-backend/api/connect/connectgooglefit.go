package connect

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	auth "server/auth"
	"server/database"
	"server/utils"

	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
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

func InitGoogleFitConnect() {
	googleOAuthConfig = &oauth2.Config{
		RedirectURL:  utils.BACKEND_URL + "/connect/googlefit/callback",
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
	state := uuid.New().String()
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

	username := auth.GetUsername(r)
	database.Dbcoll.UpdateOne(context.TODO(), bson.M{"username": username}, bson.M{"$set": bson.M{"oauth": token.RefreshToken}})
	http.Redirect(w, r, utils.FRONTEND_URL+"/app", http.StatusFound)
}
