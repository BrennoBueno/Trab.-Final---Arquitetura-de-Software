# RentX - Clean Architecture com InversifyJS

Sistema de locação de veículos seguindo **Clean Architecture**, **DDD** e **Inversão de Controle (IoC)**.

---

## 🎯 Objetivo

Provar que o domínio está isolado da infraestrutura, permitindo alternar entre:
- ✅ **Banco de Dados Real** (SQLite + Prisma) para execução
- ✅ **Mocks em Memória** (InMemory) para testes

**Apenas manipulando a injeção de dependência!**

---

## 📁 Estrutura do Projeto

```
src/
├── domain/                    # Camada de Domínio (Enterprise Business Rules)
│   ├── entities/
│   │   ├── Car.ts            # Entidade Carro
│   │   └── Rental.ts         # Entidade Aluguel
│   └── repositories/
│       ├── ICarRepository.ts      # Interface (contrato)
│       └── IRentalRepository.ts   # Interface (contrato)
│
├── application/               # Camada de Aplicação (Application Business Rules)
│   └── useCases/
│       └── createRental/
│           ├── CreateRentalUseCase.ts       # Caso de uso
│           ├── CreateRentalDTO.ts           # Data Transfer Object
│           └── CreateRentalUseCase.spec.ts  # Testes unitários
│
├── infra/                     # Camada de Infraestrutura (Frameworks & Drivers)
│   ├── database/
│   │   ├── PrismaCarRepository.ts        # Implementação Prisma
│   │   ├── PrismaRentalRepository.ts     # Implementação Prisma
│   │   └── inMemory/
│   │       ├── InMemoryCarRepository.ts  # Mock para testes
│   │       └── InMemoryRentalRepository.ts
│   └── container/
│       ├── index.ts          # Configuração do Inversify
│       └── types.ts          # Símbolos de tipos
│
└── adapters/                  # Camada de Adaptadores (Interface Adapters)
    └── cli/
        └── main.ts           # Execução via linha de comando
```

---

## 🚀 Instalação

### ⚠️ IMPORTANTE: Versões Fixas

Este projeto usa **Prisma 5.19.1** (versão estável). As versões estão fixas no `package.json` para evitar problemas de compatibilidade.

### 1. Instalar dependências

```bash
npm install
```

**Se quiser garantir versões exatas:**
```bash
npm ci
```

### 2. Configurar banco de dados

```bash
# Gerar cliente Prisma
npx prisma generate

# Criar tabelas no banco
npx prisma migrate dev --name init

# Popular banco com dados de exemplo
npx tsx prisma/seed.ts
```

---

## ✅ Executar Testes Unitários (InMemory)

Os testes usam repositórios **em memória** (não precisam de banco de dados):

```bash
npm test
```

**Resultado esperado:**
```
✓ deve ser capaz de criar um novo aluguel
✓ não deve ser capaz de criar um aluguel se o carro não existir
✓ não deve ser capaz de criar um aluguel com duração menor que 24 horas
```

---

## 🎮 Executar Aplicação Real (CLI + SQLite)

A aplicação usa repositórios **Prisma** (conecta no banco SQLite):

```bash
npm run cli
```

Ou diretamente:

```bash
npx tsx src/adapters/cli/main.ts
```

**Saída esperada:**
```
=== RentX - Sistema de Locação de Veículos ===

📝 Criando aluguel...
   Usuário: user-123
   Carro: car-456
   Devolução prevista: 05/02/2026

✅ Aluguel criado com sucesso!

📋 Detalhes do Aluguel:
   ID: uuid-gerado
   Carro: car-456
   Usuário: user-123
   Início: 02/02/2026 10:30:45
   Devolução prevista: 05/02/2026 00:00:00
```

---

## 🔄 Alternância entre InMemory e Prisma

### Para TESTES (InMemory):

Nos arquivos `*.spec.ts`, instancie diretamente:

```typescript
const inMemoryCarRepository = new InMemoryCarRepository();
const inMemoryRentalRepository = new InMemoryRentalRepository();

const createRentalUseCase = new CreateRentalUseCase(
  inMemoryCarRepository,
  inMemoryRentalRepository
);
```

---

### Para PRODUÇÃO (Prisma):

No arquivo `src/infra/container/index.ts`:

```typescript
container.bind<ICarRepository>(TYPES.CarRepository)
  .to(PrismaCarRepository)
  .inSingletonScope();

container.bind<IRentalRepository>(TYPES.RentalRepository)
  .to(PrismaRentalRepository)
  .inSingletonScope();
```

**O Use Case recebe as dependências automaticamente via `@inject()`!**

---

## 📋 Regras de Negócio

1. ✅ **Disponibilidade do Carro**: Não é possível alugar um carro indisponível
2. ✅ **Disponibilidade do Usuário**: Usuário não pode ter mais de um aluguel aberto
3. ✅ **Duração Mínima**: O aluguel deve ter no mínimo 24 horas

---

## 🛠️ Comandos Úteis

```bash
# Ver dados no banco (interface visual)
npx prisma studio

# Limpar e recriar banco
npx prisma migrate reset

# Popular banco novamente
npx tsx prisma/seed.ts

# Rodar testes
npm test

# Executar CLI
npm run cli
```

---

## 🏗️ Princípios Aplicados

- ✅ **Clean Architecture** (separação de camadas)
- ✅ **DDD** (Domain-Driven Design)
- ✅ **SOLID** (Dependency Inversion Principle)
- ✅ **IoC** (Inversão de Controle com InversifyJS)
- ✅ **Repository Pattern**
- ✅ **DTO Pattern**
- ✅ **Testes Unitários sem dependências externas**

---

## 📝 Exemplo de Uso

### 1. Popular o banco:
```bash
npx tsx prisma/seed.ts
```

### 2. Executar a aplicação:
```bash
npm run cli
```

### 3. Rodar testes:
```bash
npm test
```

---

## 🎓 Trabalho Final - Arquitetura de Software

Este projeto foi desenvolvido seguindo **rigorosamente** as especificações do trabalho final da disciplina de Arquitetura de Software.

**Todos os requisitos foram atendidos:**
- ✅ Clean Architecture com separação de camadas
- ✅ DDD (entidades, repositórios, use cases)
- ✅ InversifyJS para IoC
- ✅ Alternância entre Prisma e InMemory
- ✅ Testes unitários com mocks
- ✅ Execução via CLI (não HTTP!)
- ✅ Validações de regras de negócio

---

## 📄 Licença

MIT
