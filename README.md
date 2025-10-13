# Backend API - Interdisciplinar Fatec

Este projeto é o backend da aplicação **Interdisciplinar Fatec**, desenvolvido em **Node.js** com **Fastify**, **TypeScript** e **Drizzle ORM**, usando **PostgreSQL** como banco de dados. A API gerencia **usuários, clientes, pedidos e produtos**, incluindo autenticação via JWT e documentação via Swagger.

---

## ⚡ Funcionalidade da API

* Gerenciamento de **clientes** e seus **pedidos**.
* Consulta de pedidos por **CPF do cliente**.
* Cadastro e atualização de **produtos e pedidos**.
* Autenticação de administradores com **JWT**.
* Documentação de todas as rotas via **Swagger UI**.
* Seed do banco de dados para testes.
* Operações de **migrations** e gerenciamento de banco com **Drizzle ORM**.

---

## 📦 Tecnologias utilizadas

* Node.js + TypeScript
* Fastify (framework web)
* Fastify Swagger / Swagger UI (documentação)
* Drizzle ORM (ORM para PostgreSQL)
* PostgreSQL (banco de dados relacional)
* Zod (validação e tipagem de request/response)
* bcryptjs (hash de senhas)
* JWT (autenticação)
* Docker (opcional, para rodar o banco PostgreSQL)

---

## 🏗️ Pré-requisitos

* Node.js >= 20
* npm ou yarn
* Docker (opcional, para PostgreSQL)

---

## ⚙️ Configuração do projeto

1. Clone o repositório:

```bash
git clone https://github.com/Interdisciplinar-Fatec/Backend.git
cd Backend
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Crie o arquivo `.env` baseado no `.env.example`:

```env
PORT=3333
DATABASE_URL="postgres://docker:docker@localhost:5433/inter"
JWT_KEY="mysectKey"
PASSWORD_ADMIN="senhafortedoAdministrador"
```

4. Se estiver usando Docker, rode o PostgreSQL via `docker-compose`:

```bash
docker-compose up -d
```

---

## 🚀 Scripts disponíveis

| Comando               | Descrição                                                       |
| --------------------- | --------------------------------------------------------------- |
| `npm run dev`         | Inicia o servidor em modo desenvolvimento com reload automático |
| `npm start`           | Inicia o servidor em produção                                   |
| `npm run db:seed`     | Popula o banco de dados com dados de teste                      |
| `npm run db:studio`   | Abre o Drizzle Studio para inspeção do banco                    |
| `npm run db:generate` | Gera os arquivos de migration                                   |
| `npm run db:migrate`  | Executa as migrations no banco de dados                         |

---

## 📌 Estrutura de pastas

```
src/
├─ db/                # Conexão, migrations e seed do banco
├─ http/              # Rotas da API
├─ plugins/           # Plugins Fastify (ex: autenticação)
├─ functions/         # Funções de consulta e manipulação de dados
├─ types/             # Tipos TypeScript
├─ server.ts          # Arquivo principal do servidor
```

---

## 📑 Rotas principais

* **/users** → CRUD de usuários
* **/order/:CPF** → Lista pedidos de um cliente pelo CPF (retorna cliente + pedidos + produtos)
* **/products** → CRUD de produtos
* **/itemsOrder** → Itens de cada pedido
* **/login** → Autenticação de administradores
* **Swagger UI** disponível em: `http://localhost:3333/docs`

> Todas as rotas estão validadas com Zod e documentadas automaticamente no Swagger.

---

## 🛠️ Exemplo de uso

```bash
GET http://localhost:3333/order/12345678900
```

Retorno:

```json
{
  "id": "uuid-cliente",
  "CPF": "12345678900",
  "name": "Carlos Santos",
  "email": "carlos.santos@example.com",
  "pedidos": [
    {
      "PedidoId": "uuid-pedido",
      "DataPedido": "2025-10-10T17:20:31.915Z",
      "Produtos": [
        {
          "ProdutoId": "uuid-produto",
          "Nome": "Camisa",
          "Quantidade": 1,
          "Preco": 50
        }
      ]
    }
  ]
}
```

---

## 🔒 Autenticação

* Admins usam JWT.
* Senha do admin configurada via `.env`: `PASSWORD_ADMIN`.
* Token obtido via rota `/login` e enviado nos headers `Authorization: Bearer <token>`.

---

## 💡 Observações

* Projeto tipado com **TypeScript**, garantindo segurança de tipos.
* Drizzle ORM facilita **migrations**, **seeds** e consultas complexas.
* Swagger UI facilita **testes** e **documentação interativa**.
