import { ModelStatic } from 'sequelize'

import UserInfoModel, { UserInfoType } from '../model/UserInfoModel'

export default class UserInfoDao {
  private userInfoModel: ModelStatic<UserInfoType>
  private static isntance: UserInfoDao

  private constructor() {
    this.userInfoModel = UserInfoModel.getInstance()
  }

  public static getInstance(): UserInfoDao {
    if (!UserInfoDao.isntance) {
      UserInfoDao.isntance = new UserInfoDao()
    }
    return UserInfoDao.isntance
  }

  public addOne(userInfo: UserInfoType) {
    return this.userInfoModel.create(userInfo)
  }

  public findAll(): Promise<UserInfoType[]> {
    return this.userInfoModel.findAll({ raw: true })
  }
}
