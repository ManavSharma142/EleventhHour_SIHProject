package chatbot

import (
	"encoding/json"
	"fmt"
	"server/utils"

	"google.golang.org/genai"
)

func AddToMemoryUSER(username string, prompt string) {
	utils.Memory[username] = append(utils.Memory[username], genai.NewContentFromText(prompt, genai.RoleUser))
	for len(utils.Memory[username]) > 30 {
		utils.Memory[username] = utils.Memory[username][1:]
	}
}

func PrintMemobyUsername(username string) {
	mem := utils.Memory[username]
	for _, i := range mem {
		if i.Parts[0].Text != "" {
			fmt.Println(i.Parts[0].Text)
		} else if i.Parts[1].Text != "" {
			fmt.Println(i.Parts[1].Text)
		} else if i.Parts[0].FunctionCall.Name != "" {
			fmt.Println(i.Parts[0].FunctionCall.Name)
		} else if i.Parts[0].FunctionResponse.Name != "" {
			res, _ := json.Marshal(i.Parts[0].FunctionResponse)
			fmt.Println(string(res))
		}
		fmt.Println(i.Role)
	}
}
