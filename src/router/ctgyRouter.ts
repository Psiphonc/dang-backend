import Router from 'koa-router'
import { toNumber } from 'lodash'

import { success } from '../common/ResponseResult'
import CtgyDao from '../modules/ctgy/dao/CtgyDao'

const ctgyDao = CtgyDao.getInstance()

const router = new Router()
router.prefix('/ctgy')

router.get('/secThirdCtgy/:firstCtgyId', async (ctx) => {
  const { firstCtgyId } = ctx.params
  const result = await ctgyDao.findSecAndThirdCtgyByFirstCtgyId(
    toNumber(firstCtgyId)
  )
  ctx.body = success(result)
})

module.exports = router
