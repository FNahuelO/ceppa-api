import { STRING, UUID, TEXT, UUIDV4 } from 'sequelize'
import sequelize from '../config/sequelize.js'

const Staff = sequelize.define('Staff', {
  id: {
    type: UUID,
    defaultValue: UUIDV4, // Para generar un UUID automáticamente
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  speciality: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: STRING,
    allowNull: false,
  },
  imageName: {
    type: STRING,
    allowNull: false,
  },
  type: {
    type: STRING,
    allowNull: false,
  },
})

export default Staff
