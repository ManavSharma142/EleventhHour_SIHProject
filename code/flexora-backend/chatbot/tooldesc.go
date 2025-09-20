package chatbot

import "google.golang.org/genai"

var ToolDeciderAgent = genai.FunctionDeclaration{
	Name:        "agent",
	Description: "Decides which tools to use based on the query u can set true to all relevent tools",
	Parameters: &genai.Schema{
		Type: genai.TypeObject,
		Properties: map[string]*genai.Schema{
			"getflexcoin": {
				Type:        genai.TypeObject,
				Description: "tool to get flexcoin of user",
				Properties: map[string]*genai.Schema{
					"usetool": {
						Type:        genai.TypeBoolean,
						Description: "Set to true if the getflexcoin tool should be used.",
					},
					"username": {
						Type:        genai.TypeString,
						Description: "username of the user whose flexcoin is to be fetched",
					},
				},
			},
			"getcurremtsplit": {
				Type:        genai.TypeObject,
				Description: "tool to get current workout split and progress of user",
				Properties: map[string]*genai.Schema{
					"usetool": {
						Type:        genai.TypeBoolean,
						Description: "Set to true if the getcurremtsplit tool should be used.",
					},
					"username": {
						Type:        genai.TypeString,
						Description: "username of the user whose current split is to be fetched",
					},
				},
			},
			"getactivedays": {
				Type:        genai.TypeObject,
				Description: "tool to get active days / streak of user",
				Properties: map[string]*genai.Schema{
					"usetool": {
						Type:        genai.TypeBoolean,
						Description: "Set to true if the getactivedays tool should be used.",
					},
					"username": {
						Type:        genai.TypeString,
						Description: "username of the user whose active day / streak data is to be fetched",
					},
				},
			},
			"getgooglefittoday": {
				Type:        genai.TypeObject,
				Description: "tool to get today's google fit data of user like steps, calories burnt",
				Properties: map[string]*genai.Schema{
					"usetool": {
						Type:        genai.TypeBoolean,
						Description: "Set to true if the getgooglefittoday tool should be used.",
					},
					"username": {
						Type:        genai.TypeString,
						Description: "username of the user whose google fit data is to be fetched",
					},
				},
			},
		},
	},
}
