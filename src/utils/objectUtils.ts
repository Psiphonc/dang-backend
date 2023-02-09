import {
  ElemOfArray,
  UnionToIntersection,
  ItemType,
  StringLiteral,
} from '@/types/UtilTypes'

export function pick4Arr<
  T extends ItemType<T>[],
  K extends keyof E,
  E = ElemOfArray<T>
>(t: T, k: K[]): Pick<E, K>[]
export function pick4Arr<
  T extends ItemType<T>[],
  K extends keyof E,
  E = ElemOfArray<T>
>(t: T, k: K): E[K][]
export function pick4Arr<
  T extends ItemType<T>[],
  K extends keyof E,
  E = ElemOfArray<T>
>(t: T, k: K | K[]): Pick<E, K>[] | E[K][] {
  if (Array.isArray(k)) {
    return t.map((item) => {
      return k.reduce((acc, key) => {
        return {
          ...acc,
          [key]: item[key],
        }
      }, {}) as Pick<E, K>
    })
  } else {
    return t.map((item) => item[k])
  }
}

export function uniqItem<
  T extends ItemType<T>[],
  K extends keyof E,
  E = ElemOfArray<T>
>(arr: T, key: K): T {
  const pk = pick4Arr(arr, key)
  const uniq = [...new Set(pk)].map((item) => {
    return arr.find((i) => i[key] === item)
  }) as T
  return uniq
}

export function combine<T extends object[]>(
  ...args: T
): UnionToIntersection<T[number]> {
  return args.reduce((acc, item) => {
    return {
      ...acc,
      ...item,
    }
  }, {}) as UnionToIntersection<T[number]>
}

export function combineObj4Arr<
  T extends ItemType<T>[],
  AK extends keyof E,
  CBK extends string,
  PK extends keyof E,
  CK extends keyof E,
  E = ElemOfArray<T>
>(
  arr: T,
  assiociationKey: AK,
  combineKey: StringLiteral<CBK>,
  parentKey: (PK | AK)[],
  childKey: (CK | AK)[]
) {
  const firstTierItems = pick4Arr(uniqItem(arr, assiociationKey), parentKey)
  const result = firstTierItems.map((firstTierItem) => {
    const secondTierItems = pick4Arr(
      arr.filter(
        (item) => item[assiociationKey] === firstTierItem[assiociationKey]
      ),
      childKey
    )
    return combine(firstTierItem, { [combineKey]: secondTierItems })
  })
  return result as ({
    [pk in PK]: E[pk]
  } & {
    [cbk in StringLiteral<CBK>]: {
      [ck in CK]: E[ck]
    }
  })[]
}
