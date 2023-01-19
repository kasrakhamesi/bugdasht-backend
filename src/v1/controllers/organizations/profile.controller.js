const { sequelize } = require('../../models')

const findOne = async (req, res) => {
  try {
    const organizationId = req?.user[0]?.id
    const organization = await sequelize.models.organizations.findOne({
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

module.exports = { findOne }
