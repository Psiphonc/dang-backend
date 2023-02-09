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

export interface FirstCtgyType
  extends Model<
    InferAttributes<FirstCtgyType>,
    InferCreationAttributes<FirstCtgyType>
  > {
  firstctgyid: CreationOptional<number>
  firstctgyname: string
}

export default class FirstCtgyModel {
  private sequelize: Sequelize
  private firstCtgyModel: ModelStatic<FirstCtgyType>
  private static instance: FirstCtgyModel

  private constructor() {
    this.sequelize = BaseDao.getInstance().getSequelize()
    this.firstCtgyModel = this.sequelize.define<FirstCtgyType>('firstctgy', {
      firstctgyid: {
        type: DataTypes.INTEGER,
        field: 'firstCtgyId',
        primaryKey: true,
        autoIncrement: true,
      },
      firstctgyname: {
        type: DataTypes.STRING(30),
        field: 'firstctgyname',
        allowNull: false,
      },
    })
  }

  public static getInstance(): ModelStatic<FirstCtgyType> {
    if (!this.instance) {
      this.instance = new FirstCtgyModel()
    }
    return this.instance.firstCtgyModel
  }
}
