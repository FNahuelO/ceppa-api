import { Sequelize } from 'sequelize'
import { config } from 'dotenv'
import pg from 'pg'

config()

const { POSTGRES_USER, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_DATABASE } =
  process.env

const configDb = {
  dialect: 'postgres',
  host: POSTGRES_HOST,
  port: 5432,
  database: POSTGRES_DATABASE,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  ssl: true, // Habilita SSL
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Para evitar errores de "self signed certificate"
    },
  },
}

const sequelize = new Sequelize(configDb)

export default sequelize
