import { vi, describe, it, expect, beforeEach } from 'vitest'
import { schema } from '../db/schemas/index.ts'

vi.mock('../db/connection.ts', () => {
    const where = vi.fn().mockResolvedValue([]) 
    const from = vi.fn(() => ({ where }))
    const select = vi.fn(() => ({ from }))
    return { db: { select }, __mocks: { select, from, where } }
})

import { selectOrderId } from '../functions/select-orderId.ts'
import * as dbModule from '../db/connection.ts'

describe('selectOrderId', () => {
    beforeEach(() => vi.clearAllMocks())

    it('lança erro quando usuário não encontrado', async () => {
        await expect(selectOrderId('user-x')).rejects.toThrow('Usuario não encontrado')
        const { select } = (dbModule as any).__mocks
        expect(select).toHaveBeenCalled()
    })
})
