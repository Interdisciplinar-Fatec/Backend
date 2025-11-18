import { vi, describe, it, expect, beforeEach } from 'vitest'
import { schema } from '../db/schemas/index.ts'

vi.mock('../db/connection.ts', () => {
    const returning = vi.fn().mockResolvedValue([{ id: 'u1' }])
    const values = vi.fn(() => ({ returning }))
    const insert = vi.fn(() => ({ values }))
    return { db: { insert }, __mocks: { insert, values, returning } }
})

import { insertUser } from '../functions/insert-user.ts'
import * as dbModule from '../db/connection.ts'

describe('insertUser', () => {
    beforeEach(() => vi.clearAllMocks())

    it('chama db.insert para users', async () => {
        const params = { name: 'n', CPF: 'c', email: 'e', data_nascimento: '', telefone: '', endereco: '' }
        await insertUser(params as any)

        const { insert, values, returning } = (dbModule as any).__mocks
        expect(insert).toHaveBeenCalledWith(schema.users)
        expect(values).toHaveBeenCalled()
        expect(returning).toHaveBeenCalled()
    })
})
