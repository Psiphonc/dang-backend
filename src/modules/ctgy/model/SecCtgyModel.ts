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

export interface SecCtgyType
  extends Model<
    InferAttributes<SecCtgyType>,
    InferCreationAttributes<SecCtgyType>
  > {
  secondctgyid: CreationOptional<number>
  secctgyname: string
  firstctgyId: number
}

export default class SecCtgyModel {
  private sequelize: Sequelize
  private secCtgyModel: ModelStatic<SecCtgyType>
  private static instance: SecCtgyModel

  private constructor() {
    this.sequelize = BaseDao.getInstance().getSequelize()
    this.secCtgyModel = this.sequelize.define<SecCtgyType>('secondctgy', {
      secondctgyid: {
        type: DataTypes.INTEGER,
        field: 'secondctgyid',
        primaryKey: true,
        autoIncrement: true,
      },
      secctgyname: {
        type: DataTypes.STRING(30),
        field: 'secctgyname',
        allowNull: false,
      },
      firstctgyId: {
        type: DataTypes.INTEGER,
        field: 'firstctgyId',
        allowNull: false,
      },
    })
  }

  public static getInstance(): ModelStatic<SecCtgyType> {
    if (!this.instance) {
      this.instance = new SecCtgyModel()
    }
    return this.instance.secCtgyModel
  }
}
