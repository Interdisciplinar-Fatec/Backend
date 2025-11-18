# ⚙️ EletroConsertos - Backend API

Este projeto é o backend da aplicação **EletroConsertos**, desenvolvido em **Node.js** com **Fastify**, **TypeScript** e **Drizzle ORM**, usando **PostgreSQL** como banco de dados. A API gerencia **usuários, clientes, pedidos e produtos**, incluindo autenticação via JWT e documentação via Swagger.

---

## 🌐 Ambiente de Produção

As informações a seguir detalham onde o backend e o banco de dados estão hospedados em produção. **Atenção:** Por estarem em planos gratuitos, esses links podem mudar.

| Serviço | Hospedagem | URL/Nome | Observação |
| :--- | :--- | :--- | :--- |
| **API** | **Koyeb** | [https://surprising-zulema-interdiciplinar-fatec-fc7cbde3.koyeb.app/docs](https://surprising-zulema-interdiciplinar-fatec-fc7cbde3.koyeb.app/docs) | Link de acesso à API em produção (documentação). |
| **Banco de Dados** | **Supabase** | `[USUARIO]:[SENHA_DO_BANCO]@db.tpjibzkrsutybnlxnofy.supabase.co:5432/postgres?sslmode=require` | String de conexão do PostgreSQL (substitua [USUARIO] e [SENHA_DO_BANCO]). |
| **Imagem Docker** | **Docker Hub** | `devzevitor/fatec-2sem:v16` | Imagem utilizada para o deploy da API. |

---

## ⚡ Funcionalidade da API

*   Gerenciamento de **clientes** e seus **pedidos**.
*   Consulta de pedidos por **CPF do cliente**.
*   Cadastro e atualização de **produtos e pedidos**.
*   Autenticação de administradores com **JWT**.
*   Documentação de todas as rotas via **Swagger UI**.
*   Seed do banco de dados para testes.
*   Operações de **migrations** e gerenciamento de banco com **Drizzle ORM**.

---

## 📦 Tecnologias utilizadas

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Framework** | **Fastify** | Framework web rápido e de baixo *overhead* para Node.js. |
| **Linguagem** | **TypeScript** | Superset do JavaScript que adiciona tipagem estática. |
| **ORM** | **Drizzle ORM** | ORM moderno e *type-safe* para Node.js. |
| **Banco de Dados** | **PostgreSQL** | Sistema de gerenciamento de banco de dados relacional. |
| **Validação** | **Zod** | Validação e tipagem de request/response. |
| **Autenticação** | **JWT** e **bcryptjs** | JSON Web Tokens para autenticação e hash de senhas. |
| **Documentação** | **Fastify Swagger / Swagger UI** | Documentação interativa da API. |
| **Containerização** | **Docker** | Utilizado para facilitar a configuração do ambiente de desenvolvimento (PostgreSQL). |

---

## 💻 Configuração e Execução Local

Para configurar e executar o backend em sua máquina local, siga os passos abaixo.

### 🏗️ Pré-requisitos

1.  **Node.js** (versão 20+).
2.  **npm** ou **pnpm** (ou yarn) como gerenciador de pacotes.
3.  **Docker** e **Docker Compose** (para o banco de dados local).

### 1. Clonar o Repositório

```bash
git clone https://github.com/Interdisciplinar-Fatec/Backend.git
cd Backend
```

### 2. Instalar Dependências

Utilize o gerenciador de pacotes de sua preferência:

```bash
npm install
# ou
pnpm install
```

### 3. Configuração do Ambiente e Variáveis

Crie um arquivo chamado `.env` na raiz do projeto, baseado no `.env.example`.

**Conteúdo de `.env`:**

```env
PORT=3333
DATABASE_URL="postgres://docker:docker@localhost:5433/inter"
JWT_KEY="mysectKey"
CPF_ADMIN="00000000001"
PASSWORD_ADMIN="senhafortedoAdministrador"
```

### 4. Configuração do Banco de Dados (PostgreSQL com Docker)

O projeto utiliza o Docker Compose para iniciar o banco de dados PostgreSQL localmente.

1.  **Inicie o container do banco de dados:**
    ```bash
    docker-compose up -d
    ```
    *Isso criará um container PostgreSQL na porta `5433`, que é a porta esperada pela aplicação.*

### 5. Inicialização do Banco de Dados

Execute os scripts de inicialização para preparar o banco de dados:

1.  **Executar Migrações (Criação das Tabelas):**
    ```bash
    npm run migrate
    # ou
    pnpm run migrate
    ```

2.  **Executar Seed (População Inicial de Dados):**
    ```bash
    npm run db:seed
    # ou
    pnpm run db:seed
    ```

3.  **Criar Usuário Administrador Inicial:**
    ```bash
    npm run createAdmin
    # ou
    pnpm run createAdmin
    ```
    > **Importante:** É necessário executar este script antes de usar qualquer rota que exija autenticação de administrador. Ele usa as credenciais `CPF_ADMIN` e `PASSWORD_ADMIN` do seu arquivo `.env`.

### 6. Executar o Servidor

Inicie a API em modo de desenvolvimento. O servidor estará acessível em `http://localhost:3333`.

```bash
npm run dev
# ou
pnpm run dev
```

---

## 🐳 Docker Build e Push

Para criar uma nova imagem Docker da API e enviá-la para o Docker Hub, siga os passos abaixo:

1.  **Autentique-se no Docker Hub:**
    ```bash
    docker login
    ```

2.  **Construa a Imagem:**
    *   Assumindo que o `Dockerfile` está na raiz do projeto e o contexto de build é o diretório atual (`.`).
    ```bash
    docker build -t devzevitor/fatec-2sem:v17 .
    ```
    > **Nota:** O comando fornecido `docker build api -t .` parece estar incorreto. O formato correto é `docker build -t <nome_da_imagem>:<tag> <caminho_do_contexto>`. O comando acima utiliza o nome da imagem do seu Docker Hub e a tag `v17`.

3.  **Envie a Imagem para o Docker Hub:**
    ```bash
    docker push devzevitor/fatec-2sem:v17
    ```
    > **Atenção:** Certifique-se de que a tag (`v17` no exemplo) está correta e que você tem permissão para enviar para o repositório `devzevitor/fatec-2sem`.

---

## 🚀 Scripts disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor em modo desenvolvimento com reload automático. |
| `npm start` | Inicia o servidor em produção. |
| `npm run db:seed` | Popula o banco de dados com dados de teste. |
| `npm run db:studio` | Abre o Drizzle Studio para inspeção do banco. |
| `npm run generate` | Gera os arquivos de migration. |
| `npm run migrate` | Executa as migrations no banco de dados. |
| `npm run createAdmin` | Cria o usuário administrador inicial. |

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

*   **/users** → CRUD de usuários
*   **/order/:CPF** → Lista pedidos de um cliente pelo CPF (retorna cliente + pedidos + produtos)
*   **/products** → CRUD de produtos
*   **/itemsOrder** → Itens de cada pedido
*   **/login** → Autenticação de administradores
*   **Swagger UI** disponível em: `http://localhost:3333/docs`

> Todas as rotas estão validadas com Zod e documentadas automaticamente no Swagger.

---

## 🔒 Autenticação

*   Admins usam **JWT** (JSON Web Tokens).
*   Token obtido via rota `/login` e enviado nos headers `Authorization: Bearer <token>`.
*   A senha do admin é configurada via `.env` (`PASSWORD_ADMIN`).
*   **É obrigatório criar o administrador** usando o script `createAdmin` antes de acessar qualquer rota protegida.

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

Desenvolvido por: **Equipe Interdisciplinar FATEC**
