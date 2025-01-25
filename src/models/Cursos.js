import { STRING, UUID, UUIDV4 } from 'sequelize'
import sequelize from '../config/sequelize.js'

const Curso = sequelize.define('Curso', {
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
  startDate: {
    type: STRING,
    allowNull: false,
  },
  endDate: {
    type: STRING,
    allowNull: false
  },
  schedules: {
    type: STRING,
    allowNull: false,
  },
  class: {
    type: STRING,
    allowNull: false,
  },
  certification: {
    type: STRING,
    allowNull: false,
  },
  mode: {
    type: STRING,
    allowNull: false,
  },
})

export default Curso
