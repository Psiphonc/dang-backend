import { Sequelize } from 'sequelize-typescript'
import path from 'path'

import DbConfig from '../conf/dbconf'

export default class BaseDao {
  private static baseDao: BaseDao
  private dbConfig: DbConfig
  private suequelize: Sequelize

  private constructor() {
    this.dbConfig = DbConfig.getInstance()
    const { host, port, password, database, user } = this.dbConfig.getConfig()
    this.suequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect: 'mysql',
      define: {
        timestamps: false,
        freezeTableName: true,
      },
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 1000,
      },
    })
    this.addModels()
  }

  public static getInstance(): BaseDao {
    if (!BaseDao.baseDao) {
      BaseDao.baseDao = new BaseDao()
    }
    return BaseDao.baseDao
  }

  public getSequelize(): Sequelize {
    return this.suequelize
  }

  private addModels() {
    const modelPath = path.join(process.cwd(), 'src/model')
    this.suequelize.addModels([modelPath])
  }
}
