const { authorize } = require('../../middlewares')
const { httpError, errorTypes, messageTypes } = require('../../configs')
const { sequelize } = require('../../models')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { utils } = require('../../libs')

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
      console.log(e)
      return httpError(e?.message, res)
    })
}

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password || _.isEmpty(username) || _.isEmpty(password))
    return httpError(errorTypes.INVALID_INPUTS, res)

  const r = await sequelize.models.organizations
    .findOne({
      where: {
        username
      }
    })
    .catch((e) => {
      return httpError(e?.message, res)
    })

  if (!r) return httpError(errorTypes.INVALID_PASSWORD, res)

  if (!bcrypt.compareSync(password, r?.password))
    return httpError(errorTypes.INVALID_PASSWORD, res)

  const accessToken = authorize.generateOrganizationJwt(r?.id, r?.phoneNumber)

  delete r?.password

  return res.status(200).send({
    statusCode: 200,
    data: {
      ...r?.dataValues,
      token: {
        access: accessToken,
        expireAt: utils.timestampToIso(
          authorize.decodeJwt(accessToken, 'organization').exp
        )
      }
    },
    error: null
  })
}

const findOne = async (req, res) => {
  try {
    const organizationId = req?.user[0]?.id
    const organization = await sequelize.models.users.findOne({
      where: {
        id: organizationId
      },
      attributes: {
        exclude: ['password']
      }
    })

    return res.status(200).send({
      statusCode: 200,
      data: organization,
      error: null
    })
  } catch (e) {
    return httpError(e, res)
  }
}

module.exports = { preRegister, login, findOne }
