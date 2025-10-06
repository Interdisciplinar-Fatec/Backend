CREATE TABLE "pedidos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"data_pedido" timestamp DEFAULT now() NOT NULL,
	"status" text DEFAULT 'aberto',
	"id_cliente" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "produtos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" text NOT NULL,
	"preco" real NOT NULL,
	"descricao" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cpf" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"senha" text NOT NULL,
	"endere_o" text NOT NULL,
	"data_nascimento" text NOT NULL,
	"telefone" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_CPF_unique" UNIQUE("cpf"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_id_cliente_users_id_fk" FOREIGN KEY ("id_cliente") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;