# 📦 Wearables API

API RESTful desenvolvida com Node.js, Express, TypeScript e Prisma, utilizando Postgres via Docker.

---

## ⚙️ Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- Postgres (via Docker)
- Docker Compose

---

## 🚀 Como rodar o projeto pela primeira vez

### 1. Clone o repositório

```bash
git clone https://github.com/luannpl/wearables-api.git
cd wearables-api
```

### 2. Configure o ambiente

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Verifique a URL do banco (ajuste a porta se necessário):

```env
DATABASE_URL="postgres://postgres:postgres@localhost:5433/wearables_db"
```

---

### 3. Suba o banco com Docker

```bash
docker-compose up -d
```

> Isso iniciará um container Postgres com as credenciais definidas no `docker-compose.yml`.

---

### 4. Instale as dependências

```bash
npm install
```

---

### 5. Aplique as migrações existentes

```bash
npx prisma migrate deploy
```

> Esse comando aplica as **migrations já existentes**, sem recriar.

---

### 6. Gere o cliente Prisma

```bash
npx prisma generate
```

---

### 7. Inicie o servidor em modo desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 🧪 Prisma Studio (opcional)

Para explorar o banco visualmente:

```bash
npx prisma studio
```

---

## 🛠️ Scripts úteis

| Comando                   | Descrição                              |
|---------------------------|------------------------------------------|
| `npm run dev`             | Inicia a API em modo desenvolvimento     |
| `docker-compose up -d`    | Inicia o banco de dados via Docker       |
| `npx prisma migrate deploy` | Aplica migrações existentes no banco |
| `npx prisma studio`       | Interface visual para o banco            |

---

## 🙋 Contribuindo

1. Crie uma branch: `git switch -c minha-feature`
2. Faça commits claros
3. Abra um Pull Request para a branch `develop`
