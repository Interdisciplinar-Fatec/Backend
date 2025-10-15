CREATE TABLE "admin" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cpf" text NOT NULL,
	"senha" text NOT NULL,
	CONSTRAINT "admin_CPF_unique" UNIQUE("cpf")
);
--> statement-breakpoint
CREATE TABLE "item_pedido" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_pedido" uuid NOT NULL,
	"id_produto" uuid NOT NULL,
	"quantidade" integer DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE "pedidos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"data_pedido" timestamp DEFAULT now() NOT NULL,
	"status" text DEFAULT 'pendente',
	"valor_total" real NOT NULL,
	"descri_o" text NOT NULL,
	"id_cliente" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "produtos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome_normalizado" text NOT NULL,
	"nome" text NOT NULL,
	"preco" real NOT NULL,
	"marca" text NOT NULL,
	"descricao" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cpf" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"endereco" text NOT NULL,
	"data_nascimento" text NOT NULL,
	"telefone" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_CPF_unique" UNIQUE("cpf"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_id_pedido_pedidos_id_fk" FOREIGN KEY ("id_pedido") REFERENCES "public"."pedidos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_id_produto_produtos_id_fk" FOREIGN KEY ("id_produto") REFERENCES "public"."produtos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_id_cliente_users_id_fk" FOREIGN KEY ("id_cliente") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;