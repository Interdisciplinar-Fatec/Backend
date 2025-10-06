CREATE TABLE "item_pedido" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_pedido" uuid NOT NULL,
	"id_produto" uuid NOT NULL,
	"quantidade" integer DEFAULT 1
);
--> statement-breakpoint
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_id_pedido_pedidos_id_fk" FOREIGN KEY ("id_pedido") REFERENCES "public"."pedidos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_id_produto_produtos_id_fk" FOREIGN KEY ("id_produto") REFERENCES "public"."produtos"("id") ON DELETE cascade ON UPDATE no action;