import { vi, describe, it, expect, beforeEach } from 'vitest'
import { schema } from '../db/schemas/index.ts'

vi.mock('../db/connection.ts', () => {
    const where = vi.fn().mockResolvedValue([])
    const from = vi.fn(() => ({ where }))
    const select = vi.fn(() => ({ from }))
    return { db: { select }, __mocks: { select, from, where } }
})

import { selectUserByCPF } from '../functions/select-userByCPF.ts'
import * as dbModule from '../db/connection.ts'

describe('selectUserByCPF', () => {
    beforeEach(() => vi.clearAllMocks())

    it('chama db.select para users por CPF', async () => {
        await selectUserByCPF('000')
        const { select, from, where } = (dbModule as any).__mocks
        expect(select).toHaveBeenCalled()
        expect(from).toHaveBeenCalledWith(schema.users)
        expect(where).toHaveBeenCalled()
    })
})
