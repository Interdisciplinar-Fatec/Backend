import { vi, describe, it, expect, beforeEach } from 'vitest'
import { schema } from '../db/schemas/index.ts'

vi.mock('../db/connection.ts', () => {
  const where = vi.fn().mockResolvedValue([{ id: 'a1' }])
  const from = vi.fn(() => ({ where }))
  const select = vi.fn(() => ({ from }))
  return { db: { select }, __mocks: { select, from, where } }
})

import { selectAdmin } from '../functions/select-admin.ts'
import * as dbModule from '../db/connection.ts'

describe('selectAdmin', () => {
  beforeEach(() => vi.clearAllMocks())

  it('chama db.select para admin', async () => {
    const res = await selectAdmin('000')
    const { select, from, where } = (dbModule as any).__mocks
    expect(select).toHaveBeenCalled()
    expect(from).toHaveBeenCalledWith(schema.admin)
    expect(where).toHaveBeenCalled()
    expect(res).toBeInstanceOf(Array)
  })
})
