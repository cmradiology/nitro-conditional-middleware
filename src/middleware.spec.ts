import { describe, it, expect, vi } from 'vitest'

import { createConditionalMiddleware, createMiddlewareHandler } from './middleware'
import { H3Event } from 'h3'

describe('create middleware utils', () => {
  describe('createConditionalMiddleware', () => {
    it('should return a middleware that executes the middleware if the condition is met', async () => {
      const condition = vi.fn(() => true)
      let didExecute = false
      const middleware = vi.fn((event: H3Event) => {
        didExecute = true
      })
      const constructedMiddleware = createConditionalMiddleware(middleware, condition)

      await constructedMiddleware({} as H3Event)

      expect(middleware).toHaveBeenCalledTimes(1)
      expect(didExecute).toBe(true)
    })

    it('should return a middleware that does not execute the middleware if the condition is NOT is met', async () => {
      const condition = vi.fn(() => false) // condition is never met
      let didExecute = false
      const middleware = vi.fn((event: H3Event) => {
        didExecute = true
      })
      const constructedMiddleware = createConditionalMiddleware(middleware, condition)

      await constructedMiddleware({} as H3Event)

      expect(middleware).toHaveBeenCalledTimes(0)
      expect(didExecute).toBe(false)
    })
  })

  describe('createMiddlewareHandler', () => {
    it('should return a middleware that executes the middleware if the condition is met', async () => {
      const condition = vi.fn(() => true)
      let didExecute = false
      const middleware = vi.fn((event: H3Event) => {
        didExecute = true
      })
      const constructedMiddleware = createMiddlewareHandler(condition)(middleware)

      await constructedMiddleware({} as H3Event)

      expect(middleware).toHaveBeenCalledTimes(1)
      expect(didExecute).toBe(true)
    })

    it('should return a middleware that always executes the middleware if NO condition is set', async () => {
      let didExecute = false
      const middleware = vi.fn((event: H3Event) => {
        didExecute = true
      })
      const constructedMiddleware = createMiddlewareHandler()(middleware)

      await constructedMiddleware({} as H3Event)

      expect(middleware).toHaveBeenCalledTimes(1)
      expect(didExecute).toBe(true)
    })

    it('should return a middleware that does not execute the middleware if the condition is NOT met', async () => {
      const condition = vi.fn(() => false)
      let didExecute = false
      const middleware = vi.fn((event: H3Event) => {
        didExecute = true
      })
      const constructedMiddleware = createMiddlewareHandler(condition)(middleware)

      await constructedMiddleware({} as H3Event)

      expect(middleware).toHaveBeenCalledTimes(0)
      expect(didExecute).toBe(false)
    })
  })
})
