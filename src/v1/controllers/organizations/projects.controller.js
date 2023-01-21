const { sequelize } = require('../../models')
const { restful, filters } = require('../../libs')
const { httpError, messageTypes } = require('../../configs')
const organizationsProjects = new restful(
  sequelize.models.organizations_projects
)
const reports = new restful(sequelize.models.projects_reports)

const vulnerabilities = new restful(sequelize.models.vulnerabilities)

const findAllReportsByProjectId = async (req, res) => {
  try {
    const organizationId = req?.user[0]?.id

    const { id } = req.params
    const { page, pageSize } = req.query
    const [order, where] = await filters.filter(
      req.query,
      sequelize.models.projects_reports
    )

    const newWhere = { ...where, organizationsProjectId: id, organizationId }

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
    const organizationId = req?.user[0]?.id

    const { page, pageSize } = req.query
    const [order, where] = await filters.filter(
      req.query,
      sequelize.models.organizations_projects
    )

    const newWhere = { ...where, organizationId }

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
  const organizationId = req?.user[0]?.id

  return sequelize.models.organizations_projects
    .findOne({
      where: {
        id,
        organizationId
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

const update = async (req, res) => {}

const create = async (req, res) => {
  const organizationId = req?.user[0]?.id

  const {
    name,
    budget,
    isVip,
    lowPrice,
    midPrice,
    highPrice,
    ipAddress,
    link,
    domain,
    username,
    password,
    description,
    startAt,
    expireAt
  } = req.body

  const data = {
    name,
    organizationId,
    budget,
    isVip,
    lowPrice,
    midPrice,
    highPrice,
    ipAddress,
    link,
    domain,
    username,
    password,
    description,
    startAt,
    expireAt
  }

  return sequelize.models.organizations_projects
    .create(data)
    .then(() => {
      return res
        .status(messageTypes.SUCCESSFUL_CREATED.statusCode)
        .send(messageTypes.SUCCESSFUL_CREATED)
    })
    .catch((e) => {
      return httpError(e, res)
    })
}

const findAllVulnerabilities = async (req, res) => {
  try {
    const { page, pageSize } = req.query
    const [order, where] = await filters.filter(
      req.query,
      sequelize.models.vulnerabilities
    )

    const r = await vulnerabilities.Get({
      where,
      attributes: ['id', 'title', 'metaData'],
      order: [['id', 'asc']],
      pagination: {
        active: true,
        page,
        pageSize
      }
    })

    if (r?.statusCode !== 200) return res.status(r?.statusCode).send(r)

    return res.status(r?.statusCode).send({
      statusCode: 200,
      data: {
        page: r?.data?.page,
        pageSize: r?.data?.pageSize,
        totalCount: r?.data?.totalCount,
        totalPageLeft: r?.data?.totalPageLeft,
        totalCountLeft: r?.data?.totalCountLeft,
        vulnerabilities: r?.data?.vulnerabilities.map((item) => {
          return {
            id: item?.id,
            title: item?.title,
            metaData:
              process.env.RUN_ENVIRONMENT === 'local'
                ? JSON.parse(item?.metaData)
                : item?.metaData
          }
        })
      },
      error: null
    })
  } catch (e) {
    return httpError(e, res)
  }
}

module.exports = {
  findAllVulnerabilities,
  create,
  findAll,
  findOne,
  update,
  findAllReportsByProjectId
}
