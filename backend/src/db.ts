import { Sequelize } from 'sequelize-typescript'
import { User } from './model/User'

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env


export const sequelize = new Sequelize({
  database: DB_NAME,
  dialect: 'postgres',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  models: [User],
  logging: false,
})
