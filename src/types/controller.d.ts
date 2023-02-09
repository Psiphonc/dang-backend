import 'koa'
import Router from 'koa-router'

declare module 'koa' {
  export interface ContextDelegatedRequest {
    rootRouter: Router
  }
}
