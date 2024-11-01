import { type H3Event, defineEventHandler } from 'h3'

type Middleware = (event: H3Event) => Promise<void> | void
type AsyncMiddleware = (event: H3Event) => Promise<void>

/**
 * Returns a function that returns an h3 event handler `defineEventHandler`
 * that will run a `Middleware` based on the `conditionFn`.
 *
 * @param { (event:H3Event) => boolean } conditionFn - The condition function. The middleware will only 
 * execute if the condition function returns true.
 * @returns { (middleware: Middleware) => EventHandler } - function that returns an event handler
 */
function createMiddlewareHandler(conditionFn: (event: H3Event) => boolean = (_event: H3Event) => true) {
  return (middleware: Middleware) => {
    const conditionalMiddleware = createConditionalMiddleware(middleware, conditionFn)
    return defineEventHandler(conditionalMiddleware)
  }
}

/**
 * Given a middleware, it will only execute if the condition function returns true.
 *
 * @param { Middleware } middleware - original Middleware to be executed
 * @param { (event: H3Event) => boolean } conditionFn - the condition function that for the middleware 
 * to be executed. It depends on the event object.
 * @returns { Middleware } - A wrapped version of the original Middleware
 */
function createConditionalMiddleware(middleware: Middleware, conditionFn: (event: H3Event) => boolean): Middleware {
  return async (event: H3Event) => {
    if (conditionFn(event)) {
      await middleware(event)
    }
  }
}

export { createMiddlewareHandler, createConditionalMiddleware, type Middleware, type AsyncMiddleware }
