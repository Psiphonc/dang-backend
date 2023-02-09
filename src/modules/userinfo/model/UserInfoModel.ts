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

export interface UserInfoType
  extends Model<
    InferAttributes<UserInfoType>,
    InferCreationAttributes<UserInfoType>
  > {
  userid: CreationOptional<number>
  username: string
  password: string
  address: CreationOptional<string>
}

export default class UserInfoModel {
  private sequelize: Sequelize
  private userInfoModel: ModelStatic<UserInfoType>
  private static instance: UserInfoModel

  private constructor() {
    this.sequelize = BaseDao.getInstance().getSequelize()
    this.userInfoModel = this.sequelize.define<UserInfoType>('userinfo', {
      userid: {
        type: DataTypes.INTEGER,
        field: 'userid',
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(30),
        field: 'username',
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(20),
        field: 'psw',
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(50),
        field: 'address',
        allowNull: true,
      },
    })
  }

  public static getInstance(): ModelStatic<UserInfoType> {
    if (!this.instance) {
      this.instance = new UserInfoModel()
    }
    return this.instance.userInfoModel
  }
}
