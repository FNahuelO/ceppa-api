import { TEXT, UUID, UUIDV4 } from 'sequelize'
import sequelize from '../config/sequelize.js'

const Text = sequelize.define('Text', {
  id: {
    type: UUID,
    defaultValue: UUIDV4, // Para generar un UUID automáticamente
    primaryKey: true,
  },
  label: {
    type: TEXT,
    allowNull: false,
  },
})

export default Text
