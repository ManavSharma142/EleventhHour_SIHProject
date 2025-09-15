package utils

import (
	"github.com/fatih/color"
	"github.com/gorilla/websocket"
)

var JWT_SECRET string
var MONGODB_USERNAME string
var MONGODB_PASSWORD string
var MONGODB_CLUSTER string
var GOOGLE_CLIENT_ID string
var GOOGLE_CLIENT_SECRET string
var QDRANT_URL string
var QDRANT_API string
var GEMINI_API string

// for production and development
var FRONTEND_URL string
var BACKEND_URL string
var PROD string

// not env
var ProdBOOL bool

var Yellow = color.New(color.FgYellow).SprintFunc()
var Red = color.New(color.FgRed).SprintFunc()
var Green = color.New(color.FgGreen).SprintFunc()
var Cyan = color.New(color.FgCyan).SprintFunc()
var Blue = color.New(color.FgHiBlue).SprintFunc()
var Magenta = color.New(color.FgMagenta).SprintFunc()

type EmbeddingResponse struct {
	Values []float32 `json:"values"`
}
type EmbeddingPayload struct {
	Values string `json:"values"`
}

func ToPtr[T any](v T) *T {
	return &v
}

var LiveConn = make(map[*websocket.Conn]bool)
var ConnUser = make(map[*websocket.Conn]string)
var UserConn = make(map[string]*websocket.Conn)
