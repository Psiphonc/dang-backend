enum Code {
  SUCCESS = 200,
  SERVERERROR = 500,
}

export default class ResponseResult {
  static success(data: any = undefined, msg: string = '') {
    return {
      code: Code.SUCCESS,
      data,
      msg,
    }
  }

  static error(msg: string = '') {
    return {
      code: Code.SERVERERROR,
      data: undefined,
      msg,
    }
  }
}

const { success, error } = ResponseResult

export { success, error }
