import { Context, Next } from 'koa'
import Router from 'koa-router'

import UserInfoDao from '../modules/userinfo/dao/UserInfoDao'

const userInfoDao = UserInfoDao.getInstance()

const router = new Router()

router.prefix('/user')

router.get('/:username', async (ctx: Context, next: Next) => {
  const { username } = ctx.params
  ctx.body = 'Hello ' + username
})

router.get('/', async (ctx: Context, next: Next) => {
  ctx.body = await userInfoDao.findAll()
})

router.post('/', async (ctx) => {
  try {
    const result = await userInfoDao.addOne(ctx.request.body)
    console.log(result)
    ctx.body = result
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
