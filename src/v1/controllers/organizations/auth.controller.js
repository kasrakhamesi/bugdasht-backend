const { httpError } = require('../../configs')
const { sequelize } = require('../../models')

const preRegister = (req, res) => {
  const { name, delegateName, phoneNumber, email } = req.body
  const data = { name, delegateName, phoneNumber, email }
  return sequelize.models.organizations
    .create(data)
    .then((r) => {})
    .catch((e) => {
      return httpError(e?.message, res)
    })
}
