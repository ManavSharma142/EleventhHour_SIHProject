package chatbot

import (
	"context"
	"encoding/json"
	"fmt"
	"server/chatbot/tools"
	"server/model"
	"server/utils"

	"google.golang.org/genai"
)

type ToolArgs struct {
	Usetool  bool   `json:"usetool"`
	Username string `json:"username"`
}

type ToolDecider struct {
	GetFlexcoin       ToolArgs `json:"getflexcoin"`
	Getcurremtsplit   ToolArgs `json:"getcurremtsplit"`
	Getactivedays     ToolArgs `json:"getactivedays"`
	Getgooglefittoday ToolArgs `json:"getgooglefittoday"`
}

func Chatbot(prompt []*genai.Content, username string) {
	ctx := context.Background()
	c := model.GeminiModel()
	sysprompt := fmt.Sprintf(`You are a fitness assistant. You can help user in giving meal suggestion, workout suggestion, student advise and general fitness advice. . You are friendly and supportive.
	you are GYM Bro of Flexora made by EleventhHour team of NSUT Delhi for a project in SIH 2025.
	username of the user is %s. you can use tools to get more information about the user.
	use only this username %s to fetch data from database no other username.
	if user asks for flexcoin, current workout split or active days, use the tools to get the information.
	dont ask for confarmation about tool calls
	dont mention username in chat
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
	var decider ToolDecider
	for chunk, err := range stream {
		if err != nil {
			fmt.Println(utils.Red(err))
			return
		}
		if chunk.Candidates[0].Content.Parts[0].Text == "" && chunk.Candidates[0].Content.Parts[0].FunctionCall.Args == nil {
			finalans = "Too many user using chatbot"
			break
		}
		part := chunk.Candidates[0].Content.Parts[0]
		if part.Text != "" {
			finalans += part.Text
		} else if part.FunctionCall.Args != nil {
			res, _ := json.Marshal(part.FunctionCall.Args)
			json.Unmarshal(res, &decider)
		}
	}
	if finalans != "" {
		utils.UserConn[username].WriteJSON(Message{Text: finalans})
		utils.Memory[username] = append(utils.Memory[username], genai.NewContentFromText(finalans, genai.RoleModel))
	} else {
		var toolres string
		if decider.GetFlexcoin.Usetool {
			toolres += tools.GetFlexCoin(decider.GetFlexcoin.Username)
		}
		if decider.Getcurremtsplit.Usetool {
			toolres += tools.GetCurrentSplit(decider.Getcurremtsplit.Username)
		}
		if decider.Getactivedays.Usetool {
			toolres += tools.GetActiveDay(decider.Getactivedays.Username)
		}
		if decider.Getgooglefittoday.Usetool {
			toolres += tools.GetGoogleFitData(decider.Getgooglefittoday.Username)
		}
		PostProsser(username, toolres, prompt)
	}

}

func PostProsser(username string, toolres string, prompt []*genai.Content) {
	ctx := context.Background()
	c := model.GeminiModel()
	sysprompt := fmt.Sprintf(`You are a fitness assistant. You help users with their fitness goals and provide workout and diet plans. You are friendly and supportive.
	you are GYM Bro of Flexora made by EleventhHour team of NSUT Delhi for a project in SIH 2025.
	username of the user is %s. you can are given user details which are retrived from tool calls : %s.
	`, username, toolres)
	res, err := c.Models.GenerateContent(
		ctx,
		"gemini-2.0-flash",
		prompt,
		&genai.GenerateContentConfig{
			SystemInstruction: &genai.Content{
				Parts: []*genai.Part{{Text: sysprompt}},
			},
		})
	if err != nil {
		fmt.Println(utils.Red(err))
		return
	}
	if res.Candidates[0].Content.Parts[0].Text == "" {
		utils.UserConn[username].WriteJSON(Message{Text: "Too many user using chatbot"})
		return
	}
	utils.UserConn[username].WriteJSON(Message{Text: res.Candidates[0].Content.Parts[0].Text})
	utils.Memory[username] = append(utils.Memory[username], genai.NewContentFromText(res.Candidates[0].Content.Parts[0].Text, genai.RoleModel))
}
