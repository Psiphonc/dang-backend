import { ModelStatic, QueryTypes } from 'sequelize'
import SecondCtgyModel, { SecCtgyType } from '../model/SecCtgyModel'
import ThirdCtgyModel, { ThirdCtgyType } from '../model/ThirdCtgyModel'
import BaseDao from '../../BaseDao'
import {
  combine,
  combineObj4Arr,
  pick4Arr,
  uniqItem,
} from '../../../utils/objectUtils'
import { SecThirdCtgyType } from '../../../types/CtgyType'

export default class CtgyDao {
  private static ctgyDao: CtgyDao
  private baseDao: BaseDao
  private secCtgyModel: ModelStatic<SecCtgyType>
  private thirdCtgyModel: ModelStatic<ThirdCtgyType>

  private constructor() {
    this.baseDao = BaseDao.getInstance()
    this.secCtgyModel = SecondCtgyModel.getInstance()
    this.thirdCtgyModel = ThirdCtgyModel.getInstance()

    this.defineAssociation()
  }

  private defineAssociation() {
    // One to many
    this.secCtgyModel.hasMany(this.thirdCtgyModel, {
      foreignKey: 'secctgyid',
      as: 'thirdctgy',
    })

    // Many to one
    this.thirdCtgyModel.belongsTo(this.secCtgyModel, {
      foreignKey: 'secctgyid',
      targetKey: 'secondctgyid',
    })
  }

  public static getInstance(): CtgyDao {
    if (!CtgyDao.ctgyDao) {
      CtgyDao.ctgyDao = new CtgyDao()
    }
    return CtgyDao.ctgyDao
  }

  public async findSecAndThirdCtgyByFirstCtgyId(firstCtgyId: number) {
    const sql = `select * from secondctgy as sec inner join thirdctgy as third on sec.secondctgyid = third.secctgyid where sec.firstctgyid = :firstCtgyId`
    const result: SecThirdCtgyType[] = await this.baseDao
      .getSequelize()
      .query(sql, {
        replacements: { firstCtgyId: firstCtgyId },
        type: QueryTypes.SELECT,
      })

    return combineObj4Arr(
      result,
      'secctgyid',
      'thirdctgy',
      ['secctgyid', 'secctgyname'],
      ['secctgyid', 'thirdctgyid', 'thirdctgyname']
    )
  }
}
