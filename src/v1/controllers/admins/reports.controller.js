const { sequelize } = require('../../models')
const { restful, filters } = require('../../libs')
const { httpError, errorTypes, messageTypes } = require('../../configs')

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

    const project = await sequelize.models.organizations_projects.findOne({
      where: { id: report?.organizationsProjectId }
    })

    const hunter = await sequelize.models.hunters.findOne({
      where: {
        id: report?.hunterId
      }
    })

    if (!hunter) return httpError(errorTypes.USER_NOT_FOUND, res)

    let payableAmount = 0

    if (bugLevel === 'low') payableAmount = project?.lowPrice
    else if (bugLevel === 'mid') payableAmount = project?.midPrice
    else if (bugLevel === 'high') payableAmount = project?.highPrice

    if (parseFloat(project?.remainingBudget) < parseFloat(payableAmount))
      return httpError(errorTypes.ORGANIZATION_BUDGET_IS_NOT_ENOUGH, res)

    const t = await sequelize.transaction()

    data.payableAmount = payableAmount

    await report.update(data, {
      transaction: t
    })

    await hunter.update(
      {
        balance: hunter?.balance + payableAmount
      },
      { transaction: t }
    )

    await project.update(
      {
        remainingBudget: project?.remainingBudget - payableAmount
      },
      { transaction: t }
    )

    await t.commit()

    return res
      .status(messageTypes.SUCCESSFUL_UPDATE.statusCode)
      .send(messageTypes.SUCCESSFUL_UPDATE)
  } catch (e) {
    return httpError(e, res)
  }
}

module.exports = {
  findOne,
  findAll,
  update
}
