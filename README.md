# RentX - Clean Architecture com InversifyJS

Sistema de locação de veículos seguindo **Clean Architecture**, **DDD** e **Inversão de Controle (IoC)**.

---

##  Instalação

###  IMPORTANTE: Versões Fixas

O projeto usa **Prisma 5.19.1** (versão estável). As versões estão fixas no `package.json` para evitar problemas de compatibilidade.

### 1. Instalar dependências

npm install

### Rodar teste

npm test


### 2. Configurar banco de dados

# Gerar cliente Prisma
npx prisma generate

# Criar tabelas no banco
npx prisma migrate dev --name init

# Popular banco com dados de exemplo
npx tsx prisma/seed.ts

# Executar CLI
npm run cli



---

## 🛠️ Comandos Úteis

# Ver dados no banco (interface visual)
npx prisma studio

# Limpar e recriar banco
npx prisma migrate reset

# Popular banco novamente
npx tsx prisma/seed.ts
