const { authorize } = require('../../middlewares')
const { httpError, errorTypes } = require('../../configs')
const { sequelize } = require('../../models')
const bcrypt = require('bcrypt')
const { utils } = require('../../libs')

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return httpError(errorTypes.INVALID_INPUTS, res)

  const r = await sequelize.models.hunters
    .findOne({
      where: {
        email
      }
    })
    .catch((e) => {
      return httpError(e, res)
    })

  if (!r) return httpError(errorTypes.INVALID_PASSWORD, res)

  if (!bcrypt.compareSync(password, r?.password))
    return httpError(errorTypes.INVALID_PASSWORD, res)

  const accessToken = authorize.generateHunterJwt(r?.id, r?.phoneNumber)

  delete r?.dataValues?.password

  return res.status(200).send({
    statusCode: 200,
    data: {
      ...r?.dataValues,
      token: {
        access: accessToken,
        expireAt: utils.timestampToIso(
          authorize.decodeJwt(accessToken, 'hunter').exp
        )
      }
    },
    error: null
  })
}

const register = (req, res) => {
  const { email, nickName, password } = req.body
  const data = {
    email,
    nickName,
    password: bcrypt.hashSync(password, 12)
  }
  return sequelize.models.hunters
    .create(data)
    .then((r) => {
      if (!r) return httpError(errorTypes.INVALID_INPUTS, res)

      const accessToken = authorize.generateHunterJwt(r?.id, r?.phoneNumber)
      delete r?.dataValues?.password
      return res.status(201).send({
        statusCode: 201,
        data: {
          ...r?.dataValues,
          token: {
            access: accessToken,
            expireAt: utils.timestampToIso(
              authorize.decodeJwt(accessToken, 'hunter').exp
            )
          }
        },
        error: null
      })
    })
    .catch((e) => {
      return httpError(e, res)
    })
}

module.exports = { login, register }
