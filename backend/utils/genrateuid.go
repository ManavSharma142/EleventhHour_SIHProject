package utils

import (
	"fmt"
	"math/rand"
	"strings"
)

func GenerateUID(name string) string {
	namesus := strings.Split(name, " ")
	var n string
	for _, v := range namesus {
		n += string(v[0])
	}
	return strings.ToLower(n) + fmt.Sprintf("%d", rand.Intn(10000))
}
