import { vi, describe, it, expect, beforeEach } from 'vitest'
import { schema } from '../db/schemas/index.ts'

vi.mock('../db/connection.ts', () => {
    const where = vi.fn().mockResolvedValue([])
    const from = vi.fn(() => ({ where }))
    const select = vi.fn(() => ({ from }))
    return { db: { select }, __mocks: { select, from, where } }
})

import { selectOrderById } from '../functions/select-orderById.ts'
import * as dbModule from '../db/connection.ts'

describe('selectOrderById', () => {
    beforeEach(() => vi.clearAllMocks())

    it('chama db.select para pedidos por id', async () => {
        await selectOrderById('pedido-1')
        const { select, from, where } = (dbModule as any).__mocks
        expect(select).toHaveBeenCalled()
        expect(from).toHaveBeenCalledWith(schema.pedidos)
        expect(where).toHaveBeenCalled()
    })
})
