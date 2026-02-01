# RentX - Clean Architecture com InversifyJS

Sistema de locação de veículos seguindo **Clean Architecture**, **DDD** e **Inversão de Controle (IoC)**.

---

##  Instalação

###  IMPORTANTE: Versões Fixas

Este projeto usa **Prisma 5.19.1**

### 1. Instalar dependências

npm install


**Se quiser garantir versões exatas:**

npm ci


### 2. Configurar banco de dados


# Gerar cliente Prisma
npx prisma generate

# Criar tabelas no banco
npx prisma migrate dev --name init

# Popular banco com dados de exemplo
npx tsx prisma/seed.ts
