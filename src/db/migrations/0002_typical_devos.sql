ALTER TABLE "pedidos" ALTER COLUMN "status" SET DEFAULT 'pendente';--> statement-breakpoint
ALTER TABLE "produtos" ADD COLUMN "marca" text NOT NULL;