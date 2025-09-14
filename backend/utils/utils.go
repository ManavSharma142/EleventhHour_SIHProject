package utils

import "github.com/fatih/color"

var JWT_SECRET string
var MONGODB_USERNAME string
var MONGODB_PASSWORD string
var MONGODB_CLUSTER string
var GOOGLE_CLIENT_ID string
var GOOGLE_CLIENT_SECRET string
var QDRANT_URL string
var QDRANT_API string
var GEMINI_API string

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
