import RouterLoader from '../common/RouterLoader'
import Router from 'koa-router'
import 'reflect-metadata'

type HttpMethodType = 'get' | 'post' | 'put' | 'delete'

export function request(method: HttpMethodType) {
  return function (reqUrl: string) {
    return function (
      target: any,
      methodName: string,
      descriptor: PropertyDescriptor
    ) {
      Reflect.defineMetadata('path', reqUrl, target, methodName)
      Reflect.defineMetadata('method', method, target, methodName)
    }
  }
}

export const Get = request('get')
export const Post = request('post')
export const Put = request('put')
export const Delete = request('delete')

export function Controller(rootUrl: string) {
  const routerLoader = RouterLoader.getInstance()
  const rootRouter = routerLoader.getRootRouter()
  const controllerRouter = new Router()
  controllerRouter.prefix(rootUrl)

  return function (target: { new (...args: any): any }) {
    const controller = new target()
    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
      const path = Reflect.getMetadata('path', target.prototype, key)
      const method: HttpMethodType = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      )
      const handler = target.prototype[key]

      if (path && method && handler) {
        controllerRouter[method](path, handler.bind(controller))
      }
    })
    rootRouter.use(controllerRouter.routes(), controllerRouter.allowedMethods())
  }
}
