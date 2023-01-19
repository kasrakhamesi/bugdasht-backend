const { authorize } = require('../../middlewares')
const { httpError, errorTypes, messageTypes } = require('../../configs')
const { sequelize } = require('../../models')
const bcrypt = require('bcrypt')
const { utils } = require('../../libs')

const login = async (req, res) => {
  const { phoneNumber, password } = req.body
  if (!phoneNumber || !password)
    return httpError(errorTypes.INVALID_INPUTS, res)

  console.log('areeeeeeeee')

  const r = await sequelize.models.hunters
    .findOne({
      where: {
        phoneNumber
      }
    })
    .catch((e) => {
      return httpError(e?.message, res)
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
  const {
    firstName,
    lastName,
    nationalCode,
    birthDate,
    phoneNumber,
    password
  } = req.body
  const data = {
    firstName,
    lastName,
    nationalCode,
    birthDate,
    phoneNumber,
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
      return httpError(e?.message, res)
    })
}

const findOne = async (req, res) => {
  try {
    const hunterId = req?.user[0]?.id
    const hunter = await sequelize.models.hunters.findOne({
      where: {
        id: hunterId
      },
      attributes: {
        exclude: ['password']
      }
    })

    return res.status(200).send({
      statusCode: 200,
      data: hunter,
      error: null
    })
  } catch (e) {
    return httpError(e, res)
  }
}

module.exports = { login, register, findOne }
