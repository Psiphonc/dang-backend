import { success } from '../common/ResponseResult'
import CtgyDao from '../modules/ctgy/dao/CtgyDao'
import { toNumber } from 'lodash'
import { Controller, Get } from './controllerDecorator'
import { Context } from 'koa'

@Controller('/ctgy')
class CtgyController {
  private ctgyDao: CtgyDao

  constructor() {
    this.ctgyDao = CtgyDao.getInstance()
  }

  @Get('/secThirdCtgy/:firstCtgyId')
  async secThirdCtgy(ctx: Context) {
    try {
      const { firstCtgyId } = ctx.params
      const result = await this.ctgyDao.findSecAndThirdCtgyByFirstCtgyId(
        toNumber(firstCtgyId)
      )
      ctx.body = success(result)
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = CtgyController
