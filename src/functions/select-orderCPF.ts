import { db } from "../db/connection.ts";
import { schema } from "../db/schemas/index.ts";
import { eq} from "drizzle-orm";
import { type userType } from "../types/userType.ts";
type userFixed = Omit<userType, 'created_at'> & {
    createdAt: Date
}

export const selectOrderCPF = async (userId: string) => {
    const users:userFixed[] = await db.select().from(schema.users).where(eq(schema.users.id, userId))
    if(users.length <= 0) throw new Error("Usuario não encontrado")
    const user = users[0]

    const subquery = db
        .select({
            itemId: schema.item_pedido.id,
            pedidoId: schema.item_pedido.id_pedido,
            produtoId: schema.item_pedido.id_produto,
            quantidade: schema.item_pedido.quantidade,
            produtoNome: schema.produtos.nome,   
            produtoPreco: schema.produtos.preco, 
            produtoDescricao: schema.produtos.descricao
        })
        .from(schema.item_pedido)
        .leftJoin(
            schema.produtos,
            eq(schema.item_pedido.id_produto, schema.produtos.id)
        )
        .as("itens");

    const rows = await db
        .select({
            pedidoId: schema.pedidos.id,
            dataPedido: schema.pedidos.data_pedido,
            valorTotal: schema.pedidos.valor_total,
            descricaoPedido: schema.pedidos.descricao,
            status: schema.pedidos.status,
            itemId: subquery.itemId,
            produtoId: subquery.produtoId,
            quantidade: subquery.quantidade,
            produtoNome: subquery.produtoNome,
            produtoPreco: subquery.produtoPreco,
            produtoDescricao: subquery.produtoDescricao
        })
        .from(schema.pedidos)
        .leftJoin(subquery, eq(subquery.pedidoId, schema.pedidos.id));

    const pedidosMap = new Map<string, any>();
    const pedidosArray: any[] = [];

    for (const r of rows) {
        if (!pedidosMap.has(r.pedidoId)) {
            const novoPedido = {
                PedidoId: r.pedidoId,
                Status: r.status,
                DataPedido: r.dataPedido,
                ValorPedido: r.valorTotal,
                descricaoPedido: r.descricaoPedido,
                Produtos: [] as any[]
            };

            
            pedidosMap.set(r.pedidoId, novoPedido);
            pedidosArray.push(novoPedido);
        }

        if (r.produtoId) {
            pedidosMap.get(r.pedidoId).Produtos.push({
                ProdutoId: r.produtoId,
                Nome: r.produtoNome,
                Quantidade: r.quantidade,
                Preco: r.produtoPreco,
                ProdutoDescricao: r.produtoDescricao
            });
        }
    }

    const filteredOrder = pedidosArray.filter(p => {
        return p.Produtos.length > 0
    })

    return {
        user,
        pedidos: filteredOrder
    };
}