import sequelize from './src/config/sequelize.js'
import { app } from './src/app.js'

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log('%s listening at 3001') // eslint-disable-line no-console
  })
})
