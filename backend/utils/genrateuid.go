package utils

import (
	"fmt"
	"math/rand"
	"strings"
)

func GenerateUID(name string) string {
	char := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	namesus := strings.Split(name, " ")
	fmt.Println(namesus)
	var n string
	for _, v := range namesus {
		n += string(v)
	}
	return strings.ToLower(n) + fmt.Sprintf("%d", rand.Intn(10000)) + string(char[rand.Intn(len(char))]) + string(char[rand.Intn(len(char))]) + string(char[rand.Intn(len(char))]) + fmt.Sprintf("%d", rand.Intn(100)) + string(char[rand.Intn(len(char))]) + string(char[rand.Intn(len(char))])
}
