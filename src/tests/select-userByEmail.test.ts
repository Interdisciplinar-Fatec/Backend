import { vi, describe, it, expect, beforeEach } from 'vitest'
import { schema } from '../db/schemas/index.ts'

vi.mock('../db/connection.ts', () => {
    const where = vi.fn().mockResolvedValue([])
    const from = vi.fn(() => ({ where }))
    const select = vi.fn(() => ({ from }))
    return { db: { select }, __mocks: { select, from, where } }
})

import { selectuserByEmail } from '../functions/select-userByEmail.ts'
import * as dbModule from '../db/connection.ts'

describe('selectuserByEmail', () => {
    beforeEach(() => vi.clearAllMocks())

    it('chama db.select para users por email', async () => {
        await selectuserByEmail('e@e')
        const { select, from, where } = (dbModule as any).__mocks
        expect(select).toHaveBeenCalled()
        expect(from).toHaveBeenCalledWith(schema.users)
        expect(where).toHaveBeenCalled()
    })
})
