export type SecThirdCtgyType = {
  secondctgyid: number
  secctgyname: string
  firstctgyId: number
  thirdctgyid: number
  thirdctgyname: string
  secctgyid: number
}

export type SecCtgyType = { secondctgyid: number; secctgyname: string }

export type ThirdCtgyType = {
  secondctgyid: number
  thirdctgyid: number
  thirdctgyname: string
}

export type KeyOfSecThirdCtgyType = keyof SecThirdCtgyType
