import { type userType } from "./userType.ts"
import { type productType } from "./productType.ts"

type Order = {
    PedidoId: string;
    DataPedido: string;
    Produtos: productType[];
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
