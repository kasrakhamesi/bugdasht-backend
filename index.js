const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
require('dotenv').config()

app.use(cors())

app.use(logger('dev'))

const swaggerUi = require('swagger-ui-express')
const swaggerDocuments = {
  hunters: require('./docs/hunters.swagger.json'),
  organizations: require('./docs/organizations.swagger.json'),
  admins: require('./docs/admins.swagger.json'),
  publics: require('./docs/publics.swagger.json')
}

app.use('/v1', require('./src/v1/routes'))

app.use('/v1/hunters/api-docs', swaggerUi.serve, (...args) =>
  swaggerUi.setup(swaggerDocuments.hunters)(...args)
)

app.use('/v1/organizations/api-docs', swaggerUi.serve, (...args) =>
  swaggerUi.setup(swaggerDocuments.organizations)(...args)
)

app.use('/v1/admins/api-docs', swaggerUi.serve, (...args) =>
  swaggerUi.setup(swaggerDocuments.admins)(...args)
)

app.use('/v1/publics/api-docs', swaggerUi.serve, (...args) =>
  swaggerUi.setup(swaggerDocuments.admins)(...args)
)

app.use('*', (req, res) => {
  res.status(404).send({
    statusCode: 404,
    data: null,
    error: {
      message: 'صفحه یافت نشد'
    }
  })
})

app.listen(process.env.PORT)
