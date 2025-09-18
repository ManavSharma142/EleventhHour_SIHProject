package router

import "net/http"

func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")

		// ✅ Allow only trusted frontends
		if origin == "http://localhost:5173" || origin == "https://flexora-eleventhour.vercel.app" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin") // prevent CDN caching mixups
		}

		// ✅ Allow all needed methods and headers (especially Authorization)
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers",
			"Content-Type, Authorization, Accept, Accept-Language, Origin")

		// (Optional) expose specific headers to JS
		w.Header().Set("Access-Control-Expose-Headers", "Authorization")

		// ✅ Handle preflight
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
