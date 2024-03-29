import { STRING, UUID, UUIDV4 } from 'sequelize'
import sequelize from '../config/sequelize.js'

const Magazine = sequelize.define('Magazine', {
  id: {
    type: UUID,
    defaultValue: UUIDV4, // Para generar un UUID automáticamente
    primaryKey: true,
  },
  title: {
    type: STRING,
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
  archive: {
    type: STRING,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
})

export default Magazine
