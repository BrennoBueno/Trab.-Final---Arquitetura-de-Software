# Trab.-Final---Arquitetura-de-Software - Sistema de Aluguel de Veiculos

## Tecnologias

- Node.js + TypeScript
- Express
- Prisma + SQLite
- InversifyJS (IoC)
- Vitest (Testes)

## Instalação

# Clone o repositório

# Instale as dependências
npm install

# Configure o banco de dados
npx prisma generate
npx prisma migrate dev


## Como Usar

### Executar o servidor

npm run dev


O servidor estará disponível em `http://localhost:3333`

### Criar um aluguel

curl -X POST http://localhost:3333/rentals \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-123",
    "carId": "car-456",
    "expectedReturnDate": "2026-01-30T10:00:00.000Z"
  }'


### Executar testes

npm test


## Arquitetura

src/
├── domain/          # Entidades e Interfaces
├── application/     # Casos de Uso
├── infra/           # Implementações (Prisma, InMemory)
└── shared/          # Container IoC


## Funcionalidades

-  Criação de aluguéis com validações
-  Verificação de disponibilidade de carro
-  Verificação de aluguéis abertos do usuário
-  Validação de duração mínima (24h)
-  Alternância entre SQLite e InMemory para testes

## Regras de Negócio

1. Não é possível alugar um carro indisponível
2. Usuário não pode ter mais de um aluguel aberto
3. Duração mínima do aluguel: 24 horas

