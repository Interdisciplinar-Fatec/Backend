import { vi, describe, it, expect, beforeEach } from 'vitest'
import { schema } from '../db/schemas/index.ts'

vi.mock('../db/connection.ts', () => {
    const returning = vi.fn().mockResolvedValue([{ id: 'p1' }])
    const values = vi.fn(() => ({ returning }))
    const insert = vi.fn(() => ({ values }))
    return { db: { insert }, __mocks: { insert, values, returning } }
})

import { insertProduct } from '../functions/insert-product.ts'
import * as dbModule from '../db/connection.ts'

describe('insertProduct', () => {
    beforeEach(() => vi.clearAllMocks())

    it('chama db.insert com produtos', async () => {
        const params = { nome: 'x', nome_normalizado: 'x', descricao: '', marca: '', preco: 10 }
        await insertProduct(params as any)

        const { insert, values, returning } = (dbModule as any).__mocks
        expect(insert).toHaveBeenCalledWith(schema.produtos)
        expect(values).toHaveBeenCalled()
        expect(returning).toHaveBeenCalled()
    })
})
