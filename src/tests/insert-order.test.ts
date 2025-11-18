import { vi, describe, it, expect, beforeEach } from 'vitest'
import { schema } from '../db/schemas/index.ts'

vi.mock('../db/connection.ts', () => {
    const returning = vi.fn().mockResolvedValue([{ id: '1' }])
    const values = vi.fn(() => ({ returning }))
    const insert = vi.fn(() => ({ values }))
    return { db: { insert }, __mocks: { insert, values, returning } }
})

import { insertOrder } from '../functions/insert-order.ts'
import * as dbModule from '../db/connection.ts'

describe('insertOrder', () => {
    beforeEach(() => vi.clearAllMocks())

    it('chama db.insert e retorna resultado', async () => {
        const user = { id: 'user-1' }
        const res = await insertOrder(user as any, 100, 'desc')

        const { insert, values, returning } = (dbModule as any).__mocks
        expect(insert).toHaveBeenCalledWith(schema.pedidos)
        expect(values).toHaveBeenCalled()
        expect(returning).toHaveBeenCalled()
    })
})
