FROM golang:1.24.5 AS build
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o server .
FROM golang:1.24.5
WORKDIR /app
COPY --from=build /app/server .
EXPOSE 8000
CMD ["./server"]
