import { vi, describe, it, expect, beforeEach } from 'vitest'
import { schema } from '../db/schemas/index.ts'

vi.mock('../db/connection.ts', () => {
    const where = vi.fn().mockResolvedValue({ rowCount: 1 })
    const set = vi.fn(() => ({ where }))
    const update = vi.fn(() => ({ set }))
    return { db: { update }, __mocks: { update, set, where } }
})

import { reactiveProduct } from '../functions/reactive-product.ts'
import * as dbModule from '../db/connection.ts'

describe('reactiveProduct', () => {
    beforeEach(() => vi.clearAllMocks())

    it('chama update para reativar produto', async () => {
        const id = 'prod-1'
        await reactiveProduct(id)

        const { update, set, where } = (dbModule as any).__mocks
        expect(update).toHaveBeenCalledWith(schema.produtos)
        expect(set).toHaveBeenCalledWith({ ativo: true })
        expect(where).toHaveBeenCalled()
    })
})
