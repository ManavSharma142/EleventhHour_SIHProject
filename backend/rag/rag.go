package rag

import (
	"server/model"
)

func LookUP(pay string, coll string) string {
	c := model.GeminiModel()
	//fmt.Println("Payload to be embedded: ", pay)
	chunk := []string{pay}

	embedings := DoEmbedding(c, chunk)
	if len(embedings) == 0 {
		return "No embeddings generated"
	}

	if len(embedings[0].Values) == 0 {
		return "Embedding returned with empty values"
	}

	res := QDrantLookup(embedings[0].Values, coll)
	//fmt.Println("Response from Qdrant: ", res)
	return res
}
