const { sequelize } = require('../../models')
const { restful, filters } = require('../../libs')
const { httpError, errorTypes } = require('../../configs')

const reports = new restful(sequelize.models.projects_reports)

const findOne = async (req, res) => {
  const { id } = req.params

  return sequelize.models.projects_reports
    .findOne({
      where: {
        id
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
    const { page, pageSize } = req.query
    const [order, where] = await filters.filter(
      req.query,
      sequelize.models.projects_reports
    )

    const r = await reports.Get({
      where,
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

const findAllByOrganizationId = async (req, res) => {
  try {
    const { id } = req.params

    const { page, pageSize } = req.query
    const [order, where] = await filters.filter(
      req.query,
      sequelize.models.projects_reports
    )

    const newWhere = { ...where, organizationId: id }

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

const update = async (req, res) => {
  try {
    const { id } = req.params

    const adminId = req?.user[0]?.id

    const { bugLevel, adminResponseStatus, rejectedReason } = req.body

    if (
      adminResponseStatus !== 'pending' &&
      adminResponseStatus !== 'approved' &&
      adminResponseStatus !== 'rejected'
    )
      return httpError(errorTypes.INVALID_INPUTS, res)
    else if (bugLevel !== 'low' && bugLevel !== 'mid' && bugLevel !== 'high')
      return httpError(errorTypes.INVALID_INPUTS, res)

    const report = await sequelize.models.projects_reports.findOne({
      where: {
        id
      }
    })

    if (!report) return httpError(errorTypes.PROJECT_NOT_FOUND, res)

    const data = {
      adminId,
      bugLevel,
      adminResponseStatus,
      rejectedReason
    }
  } catch (e) {
    return httpError(e, res)
  }
}

module.exports = {
  findOne,
  findAll,
  update
}
