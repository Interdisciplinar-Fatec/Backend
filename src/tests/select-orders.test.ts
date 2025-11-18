import { vi, describe, it, expect, beforeEach } from 'vitest'
import { schema } from '../db/schemas/index.ts'

vi.mock('../db/connection.ts', () => {
    const from = vi.fn().mockResolvedValue([])
    const select = vi.fn(() => ({ from }))
    return { db: { select }, __mocks: { select, from } }
})

import { selectOrders } from '../functions/select-orders.ts'
import * as dbModule from '../db/connection.ts'

describe('selectOrders', () => {
    beforeEach(() => vi.clearAllMocks())

    it('chama db.select e retorna array', async () => {
        const res = await selectOrders()
        const { select, from } = (dbModule as any).__mocks
        expect(select).toHaveBeenCalled()
        expect(from).toHaveBeenCalledWith(schema.pedidos)
        expect(res).toBeInstanceOf(Array)
    })
})
