const { authorize } = require('../../middlewares')
const { httpError, errorTypes, messageTypes } = require('../../configs')
const { sequelize } = require('../../models')

const preRegister = (req, res) => {
  const { name, delegateName, phoneNumber, email } = req.body
  const data = { name, delegateName, phoneNumber, email }
  return sequelize.models.organizations
    .create(data)
    .then((r) => {
      if (!r) return httpError(errorTypes.INVALID_INPUTS, res)
      return res
        .status(messageTypes.SUCCESSFUL_CREATED.statusCode)
        .send(messageTypes.SUCCESSFUL_CREATED)
    })
    .catch((e) => {
      return httpError(e?.message, res)
    })
}

module.exports = { preRegister }
