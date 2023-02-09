export type ElemOfArray<T> = T extends Array<infer P> ? P : never

export type ItemType<T extends Array<object>, E = ElemOfArray<T>> = {
  [K in keyof E]: E[K]
}

export type UnionToIntersection<U> = (
  U extends any ? (args: U) => void : never
) extends (args: infer I) => void
  ? I
  : never

export type StringLiteral<T> = T extends string
  ? string extends T
    ? never
    : T
  : never
