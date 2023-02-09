import { isString } from 'lodash'

interface DbConnConfig {
  host: string
  port: number
  user: string
  password: string
  database: string
}

interface EnvConfig {
  dev: DbConnConfig
  prod: DbConnConfig
}

export default class DbConfig {
  private env: keyof EnvConfig
  private envConfig: EnvConfig

  public static instance: DbConfig

  private constructor() {
    this.env = process.env.NODE_ENV === 'prod' ? 'prod' : 'dev'
    this.envConfig = {
      dev: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'secret',
        database: 'dangdang',
      },
      prod: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'secret',
        database: 'dangdang',
      },
    }
  }

  public static getInstance(): DbConfig {
    if (!DbConfig.instance) {
      DbConfig.instance = new DbConfig()
    }
    return DbConfig.instance
  }

  public getConfig(): DbConnConfig
  public getConfig(key: string): string
  public getConfig(key: any = ''): any {
    if (this.isDbConfigKey(key)) {
      return this.envConfig[this.env][key]
    } else {
      return this.envConfig[this.env]
    }
  }

  private isDbConfigKey(key: any): key is keyof DbConnConfig {
    return (
      isString(key) &&
      key.length > 0 &&
      this.envConfig[this.env].hasOwnProperty(key)
    )
  }
}
