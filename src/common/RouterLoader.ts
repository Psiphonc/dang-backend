import path from 'path'
import fs from 'fs'
import Router from 'koa-router'
import Koa from 'koa'
import json from 'koa-json'
import body from 'koa-body'
import globalException from './globalException'

export default class RouterLoader {
  private app!: Koa

  public static instance: RouterLoader

  private constructor() {
    this.app = new Koa()
    this.app.context.rootRouter = this.generateRootRouter('/dang')
    this.loadMiddleware()
  }

  public static getInstance(): RouterLoader {
    if (!this.instance) {
      this.instance = new RouterLoader()
    }
    return this.instance
  }

  private static getControllerFiles(): string[] {
    const pwd = process.cwd()
    const fullControllerPath = path.join(pwd, 'src/controller')
    const controllerFiles = fs.readdirSync(fullControllerPath)
    const abscontrollerFiles = controllerFiles.map((file) =>
      path.join(fullControllerPath, file)
    )
    return abscontrollerFiles.filter(RouterLoader.isControllerFile)
  }

  private loadMiddleware() {
    this.app.use(globalException)
    this.app.use(json())
    this.app.use(body())
  }

  private loadController(controllerFiles: string[]) {
    controllerFiles.forEach((file) => {
      require(file)
    })
  }

  private static isControllerFile(file: string): boolean {
    const fileMeta = path.parse(file)
    return fileMeta.ext === '.ts' && fileMeta.name.endsWith('Controller')
  }

  private generateRootRouter(rootPrefix: string): Router {
    const rootRouter = new Router()
    rootRouter.prefix(rootPrefix)
    return rootRouter
  }

  public getRootRouter(): Router {
    return this.app.context.rootRouter
  }

  public listen(port: number) {
    const controllerFiles = RouterLoader.getControllerFiles()
    this.loadController(controllerFiles)
    this.app.use(this.app.context.rootRouter.routes())
    this.app.listen(port)
    console.log(`Server is running at http://localhost:${port}`)
  }
}
