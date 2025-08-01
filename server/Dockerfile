FROM golang:1.24.3 as builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o main ./cmd/main.go

FROM gcr.io/distroless/base-debian12

WORKDIR /app
COPY --from=builder /app/main .

EXPOSE 8080
CMD ["./main"]
