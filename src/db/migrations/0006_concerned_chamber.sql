CREATE TABLE "admin" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cpf" text NOT NULL,
	"senha" text NOT NULL,
	CONSTRAINT "admin_CPF_unique" UNIQUE("cpf")
);
