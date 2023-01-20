const { sequelize } = require('../../models')
const { restful, filters } = require('../../libs')
const { httpError } = require('../../configs')
const { Op } = require('sequelize')
const organizationsProjects = new restful(
  sequelize.models.organizations_projects
)

const findAll = async (req, res) => {
  try {
    const { page, pageSize } = req.query
    const [order, where] = await filters.filter(
      req.query,
      sequelize.models.organizations_projects
    )

    const newWhere = { ...where, status: { [Op.not]: 'canceled' } }

    const r = await organizationsProjects.Get({
      where: newWhere,
      attributes: {
        exclude: ['organizationId']
      },
      order: [['id', 'desc']],
      pagination: {
        active: true,
        page,
        pageSize
      }
    })

    return res.status(r?.statusCode).send(r)
  } catch (e) {
    return httpError(e, res)
  }
}

const findOne = (req, res) => {
  const { id } = req.params

  return sequelize.models.organizations_projects
    .findOne({
      where: {
        id
      },
      attributes: {
        exclude: ['organizationId']
      }
    })
    .then((r) => {
      return res.status(200).send({
        statusCode: 200,
        data: r,
        error: null
      })
    })
    .catch((e) => {
      return httpError(e, res)
    })
}

module.exports = { findOne, findAll }
