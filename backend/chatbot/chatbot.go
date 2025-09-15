package chatbot

import (
	"context"
	"fmt"
	"server/model"
	"server/utils"

	"google.golang.org/genai"
)

func Chatbot(prompt string, username string) {
	ctx := context.Background()
	c := model.GeminiModel()
	sysprompt := "You are a fitness assistant. You help users with their fitness goals and provide workout and diet plans. You are friendly and supportive."

	fmt.Println(utils.Magenta("Prompt: "), prompt)

	stream := c.Models.GenerateContentStream(
		ctx,
		"gemini-2.5-flash",
		genai.Text(prompt),
		&genai.GenerateContentConfig{
			Tools: []*genai.Tool{
				{
					FunctionDeclarations: []*genai.FunctionDeclaration{
						&ToolDeciderAgent,
					},
				},
			},
			SystemInstruction: &genai.Content{
				Parts: []*genai.Part{{Text: sysprompt}},
			},
		},
	)
	for chunk, err := range stream {
		if err != nil {
			fmt.Println(utils.Red(err))
			return
		}
		part := chunk.Candidates[0].Content.Parts[0]
		if part.Text != "" {
			utils.UserConn[username].WriteJSON(Message{Text: part.Text})
		} else if part.FunctionCall.Args != nil {
			utils.UserConn[username].WriteJSON(part.FunctionCall.Args)
		}
	}
}
