# Etapa 1: Builder - compilar o código Go
FROM golang:1.23-alpine AS builder

# Definir diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos do projeto para o contêiner
COPY . .

# Baixar as dependências e compilar a API
RUN go mod download
RUN go build -o main .

# Etapa 2: Execução - criar uma imagem mínima para rodar a API
FROM alpine:latest

# Definir diretório de trabalho para a etapa de execução
WORKDIR /root/

# Copiar o binário Go compilado da etapa de build para a etapa final
COPY --from=builder /app/main .

# Expor a porta 8080 para a API
EXPOSE 8080

# Comando para rodar a API
CMD ["./main"]
