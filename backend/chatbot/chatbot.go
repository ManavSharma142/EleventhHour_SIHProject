package chatbot

import (
	"context"
	"fmt"
	"server/model"
	"server/utils"

	"google.golang.org/genai"
)

func Chatbot(prompt []*genai.Content, username string) {
	ctx := context.Background()
	c := model.GeminiModel()
	sysprompt := fmt.Sprintf(`You are a fitness assistant. You help users with their fitness goals and provide workout and diet plans. You are friendly and supportive.
	you are GYM Buddy of Flexora made by EleventhHour team of NSUT Delhi for a project in SIH 2025.
	username of the user is %s. you can use tools to get more information about the user.
	use only this username %s to fetch data from database no other username.
	only give perfect and precise answers. if you dont know the answer, you can say "I am not sure about that. Let me get back to you on that."
	if user asks for flexcoin, current workout split or active days, use the tools to get the information.
	always greet the user by their username.
	`, username, username)

	stream := c.Models.GenerateContentStream(
		ctx,
		"gemini-2.5-flash",
		prompt,
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
	finalans := ""
	for chunk, err := range stream {
		if err != nil {
			fmt.Println(utils.Red(err))
			return
		}
		part := chunk.Candidates[0].Content.Parts[0]
		if part.Text != "" {
			finalans += part.Text
			utils.UserConn[username].WriteJSON(Message{Text: finalans})
		} else if part.FunctionCall.Args != nil {
			utils.UserConn[username].WriteJSON(part.FunctionCall.Args)
		}
	}
	utils.Memory[username] = append(utils.Memory[username], genai.NewContentFromText(finalans, genai.RoleModel))
}
