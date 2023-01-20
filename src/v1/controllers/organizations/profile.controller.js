const { authorize } = require('../../middlewares')
const { sequelize } = require('../../models')

const findOne = async (req, res) => {
  try {
    const organizationId = req?.user[0]?.id
    const organization = await sequelize.models.organizations.findOne({
      where: {
        id: organizationId
      },
      attributes: {
        exclude: ['password', 'adminId']
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

const changePassword = async (req, res) => {
  const organizationId = req?.user[0]?.id

  const { previousPassword, newPassword } = req.body
  if (!previousPassword || !newPassword)
    return httpError(errorTypes.INVALID_INPUTS, res)

  const r = await sequelize.models.organizations
    .findOne({
      where: {
        id: organizationId
      }
    })
    .catch((e) => {
      return httpError(e, res)
    })

  if (!r) return httpError(errorTypes.USER_NOT_FOUND, res)

  if (!bcrypt.compareSync(previousPassword, r?.password))
    return httpError(errorTypes.INVALID_PASSWORD, res)

  await r.update({ password: newPassword })

  const accessToken = authorize.generateOrganizationJwt(r?.id, r?.phoneNumber)

  delete r?.dataValues?.password
  delete r?.dataValues?.adminId

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
/*
const update = (req, res) => {
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
*/
module.exports = { findOne, changePassword }
