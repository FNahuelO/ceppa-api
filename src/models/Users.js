import { ENUM, STRING, UUID, UUIDV4 } from 'sequelize'
import sequelize from '../config/sequelize.js'

const User = sequelize.define('User', {
  id: {
    type: UUID,
    defaultValue: UUIDV4, // Para generar un UUID automáticamente
    primaryKey: true,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: ENUM('ADMIN', 'USER'),
    allowNull: false,
  },
})

export default User
