import {
  Sequelize,
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ModelStatic,
} from 'sequelize'

import BaseDao from '../../BaseDao'

export interface ThirdCtgyType
  extends Model<
    InferAttributes<ThirdCtgyType>,
    InferCreationAttributes<ThirdCtgyType>
  > {
  thirdctgyid: CreationOptional<number>
  thirdctgyname: string
  secondctgyId: number
}

export default class ThirdCtgyModel {
  private sequelize: Sequelize
  private thirdCtgyModel: ModelStatic<ThirdCtgyType>
  private static instance: ThirdCtgyModel

  private constructor() {
    this.sequelize = BaseDao.getInstance().getSequelize()
    this.thirdCtgyModel = this.sequelize.define<ThirdCtgyType>('thirdctgy', {
      thirdctgyid: {
        type: DataTypes.INTEGER,
        field: 'thirdctgyid',
        primaryKey: true,
        autoIncrement: true,
      },
      thirdctgyname: {
        type: DataTypes.STRING(30),
        field: 'thirdctgyname',
        allowNull: false,
      },
      secondctgyId: {
        type: DataTypes.INTEGER,
        field: 'secctgyid',
        allowNull: false,
      },
    })
  }

  public static getInstance(): ModelStatic<ThirdCtgyType> {
    if (!this.instance) {
      this.instance = new ThirdCtgyModel()
    }
    return this.instance.thirdCtgyModel
  }
}
