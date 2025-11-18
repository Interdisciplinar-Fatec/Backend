import { describe, it, expect, beforeEach, vi } from 'vitest'
import { schema } from '../db/schemas/index.ts'

vi.mock("../db/connection.ts", () => {
    const where = vi.fn().mockResolvedValue({ rowCount: 1 })
    const set = vi.fn(() => ({ where }))
    const update = vi.fn(() => ({ set }))
    return { db: { update }, __mocks: { update, set, where } }
})

import { desactiveProduct } from '../functions/desactive-product.ts'
import * as dbModule from '../db/connection.ts'

describe('desactiveProduct', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('deve chamar db.update com a tabela de produtos, set ativo:false e aplicar where com id', async () => {

        const id = "prod-1"

        const result = await desactiveProduct(id)
        const { update, set, where } = (dbModule as any).__mocks

        expect(update).toHaveBeenCalledWith(schema.produtos)
        expect(set).toHaveBeenCalledWith({ ativo: false })
        expect(where).toHaveBeenCalled()
    })
})