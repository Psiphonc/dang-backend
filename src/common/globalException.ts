import Koa from 'koa'
import ResponsResult from './ResponseResult'

async function globalException(ctx: Koa.Context, next: Koa.Next) {
  console.log('Enter globalException')
  try {
    await next()
  } catch (err: any) {
    ResponsResult.error(err.message)
  }
}

export default globalException
