const { sequelize } = require('../../models')
const { restful, filters } = require('../../libs')
const { httpError, errorTypes, messageTypes } = require('../../configs')
const organizationsProjects = new restful(
  sequelize.models.organizations_projects
)
const reports = new restful(sequelize.models.projects_reports)

const findAllReportsByProjectId = async (req, res) => {
  try {
    const { id } = req.params
    const { page, pageSize } = req.query
    const [order, where] = await filters.filter(
      req.query,
      sequelize.models.projects_reports
    )

    const newWhere = { ...where, organizationsProjectId: id }

    const r = await reports.Get({
      where: newWhere,
      include: [
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

const findAll = async (req, res) => {
  try {
    const { page, pageSize } = req.query
    const [order, where] = await filters.filter(
      req.query,
      sequelize.models.organizations_projects
    )

    const r = await organizationsProjects.Get({
      where,
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

const update = async (req, res) => {
  try {
    const { id } = req.params

    const adminId = req?.user[0]?.id

    const { status, cancelReason } = req.body

    const data = {
      status,
      cancelReason,
      adminId
    }

    if (
      !status ||
      (status !== 'canceled' &&
        status !== 'approved_for_payment' &&
        status !== 'approved')
    )
      return httpError(errorTypes.INVALID_INPUTS, res)

    const r = await sequelize.models.organizations_projects.findOne({
      where: {
        id
      }
    })

    if (!r) return httpError(errorTypes.PROJECT_NOT_FOUND, res)

    await r.update(data)

    return res
      .status(messageTypes.SUCCESSFUL_UPDATE.statusCode)
      .send(messageTypes.SUCCESSFUL_UPDATE)
  } catch (e) {
    return httpError(e, res)
  }
}

module.exports = { findAll, update, findOne, findAllReportsByProjectId }
