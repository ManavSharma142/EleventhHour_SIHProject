package router

import "net/http"

func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// You can set the origin to your frontend domain in production.
		// For a public API, a wildcard origin may be appropriate,
		// but remember that credentials cannot be sent with a wildcard origin.
		// w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// The Access-Control-Allow-Credentials header cannot be used with a wildcard origin.
		// Uncomment the line below only if you are using a specific origin (e.g., http://localhost:3000)
		// w.Header().Set("Access-Control-Allow-Credentials", "true")

		// If the request is a preflight request (OPTIONS), we send a 200 OK
		// and return immediately without calling the next handler.
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Otherwise, pass the request to the next handler in the chain.
		next.ServeHTTP(w, r)
	})
}
