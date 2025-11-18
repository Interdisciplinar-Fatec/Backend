import { vi, describe, it, expect, beforeEach } from 'vitest'
import { schema } from '../db/schemas/index.ts'

vi.mock('../db/connection.ts', () => {
    const where = vi.fn().mockResolvedValue([])
    const from = vi.fn(() => ({ where }))
    const select = vi.fn(() => ({ from }))
    return { db: { select }, __mocks: { select, from, where } }
})

import { selectProductName } from '../functions/select-productName.ts'
import * as dbModule from '../db/connection.ts'

describe('selectProductName', () => {
    beforeEach(() => vi.clearAllMocks())

    it('chama db.select with nome_normalizado', async () => {
        await selectProductName('nome')
        const { select, from, where } = (dbModule as any).__mocks
        expect(select).toHaveBeenCalled()
        expect(from).toHaveBeenCalledWith(schema.produtos)
        expect(where).toHaveBeenCalled()
    })
})
