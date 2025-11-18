import { vi, describe, it, expect, beforeEach } from 'vitest'
import { schema } from '../db/schemas/index.ts'

vi.mock('../db/connection.ts', () => {
    const where = vi.fn().mockResolvedValue({ rowCount: 1 })
    const set = vi.fn(() => ({ where }))
    const update = vi.fn(() => ({ set }))
    return { db: { update }, __mocks: { update, set, where } }
})

import { updateOrderStatus } from '../functions/update-order.ts'
import * as dbModule from '../db/connection.ts'

describe('updateOrderStatus', () => {
    beforeEach(() => vi.clearAllMocks())

    it('chama update para alterar status', async () => {
        await updateOrderStatus('ENTREGUE', 'pedido-1')
        const { update, set, where } = (dbModule as any).__mocks
        expect(update).toHaveBeenCalledWith(schema.pedidos)
        expect(set).toHaveBeenCalledWith({ status: 'ENTREGUE' })
        expect(where).toHaveBeenCalled()
    })
})
