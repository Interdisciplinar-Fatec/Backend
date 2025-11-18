import { vi, describe, it, expect, beforeEach } from 'vitest'
import { schema } from '../db/schemas/index.ts'

vi.mock('../db/connection.ts', () => {
    const where = vi.fn().mockResolvedValue([])
    const from = vi.fn(() => ({ where }))
    const select = vi.fn(() => ({ from }))
    return { db: { select }, __mocks: { select, from, where } }
})

import { selectUserByName } from '../functions/select-userByName.ts'
import * as dbModule from '../db/connection.ts'

describe('selectUserByName', () => {
    beforeEach(() => vi.clearAllMocks())

    it('chama db.select para users por nome', async () => {
        await selectUserByName('nome')
        const { select, from, where } = (dbModule as any).__mocks
        expect(select).toHaveBeenCalled()
        expect(from).toHaveBeenCalledWith(schema.users)
        expect(where).toHaveBeenCalled()
    })
})
