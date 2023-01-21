const { sequelize } = require('../../models')
const { restful, filters } = require('../../libs')
const { httpError } = require('../../configs')

const reports = new restful(sequelize.models.projects_reports)

const findOne = async (req, res) => {
  const { id } = req.params
  const organizationId = req?.user[0]?.id

  return sequelize.models.projects_reports
    .findOne({
      where: {
        id,
        organizationId
      },
      include: [
        {
          model: sequelize.models.organizations_projects,
          as: 'project'
        },
        {
          model: sequelize.models.hunters,
          attributes: ['nickName']
        }
      ]
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

const findAll = async (req, res) => {
  try {
    const organizationId = req?.user[0]?.id

    const { page, pageSize } = req.query
    const [order, where] = await filters.filter(
      req.query,
      sequelize.models.projects_reports
    )
    const newWhere = { ...where, organizationId }

    const r = await reports.Get({
      where: newWhere,
      attributes: {
        exclude: ['hunterId']
      },
      include: [
        {
          model: sequelize.models.organizations_projects,
          as: 'project'
        },
        {
          model: sequelize.models.hunters,
          attributes: ['nickName']
        }
      ],
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

module.exports = {
  findOne,
  findAll
}
