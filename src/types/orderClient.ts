type Order = {
    PedidoId: string,
    DataPedido: Date,
    Status: string | null,
    ValorPedido: number,
    descricaoPedido:string,
    Produtos: {
        ProdutoId: string,
        Nome: string | null,
        Quantidade: number | null,
        Preco: number | null,
        ProdutoDescricao: string | null,
    }[];
};

export type OrdersClient =  {
    user: {
        id: string,
        name: string,
        CPF: string,
        data_nascimento: string,
        endereco: string,
        telefone: string,
        email: string,
        createdAt: Date,
    }
    pedidos: Order[]
};
