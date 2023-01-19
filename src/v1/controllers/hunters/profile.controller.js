const { httpError, errorTypes, messageTypes } = require('../../configs')
const { sequelize } = require('../../models')
const bcrypt = require('bcrypt')
const { utils } = require('../../libs')

const updateIban = (req, res) => {
  const { shebaNumber } = req.body
  if (!shebaNumber) return httpError(errorTypes.INVALID_INPUTS, res)
  const hunterId = req?.user[0]?.id
  return sequelize.models.hunters
    .findOne({
      where: { id: hunterId }
    })
    .then((r) => {
      r?.update({
        shebaNumber
      }).then(() => {
        return res
          .status(messageTypes.SUCCESSFUL_UPDATE.statusCode)
          .send(messageTypes.SUCCESSFUL_UPDATE)
      })
    })
    .catch((e) => {
      return httpError(e, res)
    })
}

const updateSocialNetworkData = (req, res) => {
  const { twitter, linkedin, bugCrowd, hackerOne } = req.body
  const data = { twitter, linkedin, bugCrowd, hackerOne }
  if (!shebaNumber) return httpError(errorTypes.INVALID_INPUTS, res)
  const hunterId = req?.user[0]?.id
  return sequelize.models.hunters
    .findOne({
      where: { id: hunterId }
    })
    .then((r) => {
      r?.update(data).then(() => {
        return res
          .status(messageTypes.SUCCESSFUL_UPDATE.statusCode)
          .send(messageTypes.SUCCESSFUL_UPDATE)
      })
    })
    .catch((e) => {
      return httpError(e, res)
    })
}

const changePassword = async (req, res) => {
  const hunterId = req?.user[0]?.id

  const { previousPassword, newPassword } = req.body
  if (!previousPassword || !newPassword)
    return httpError(errorTypes.INVALID_INPUTS, res)

  const r = await sequelize.models.hunters
    .findOne({
      where: {
        id: hunterId
      }
    })
    .catch((e) => {
      return httpError(e, res)
    })

  if (!r) return httpError(errorTypes.USER_NOT_FOUND, res)

  if (!bcrypt.compareSync(previousPassword, r?.password))
    return httpError(errorTypes.INVALID_PASSWORD, res)

  await r.update({ password: newPassword })

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

module.exports = {
  updateIban,
  updateSocialNetworkData,
  findOne,
  changePassword
}
