const { sequelize } = require('../../models')
const { restful, filters } = require('../../libs')
const { httpError, messageTypes } = require('../../configs')
const organizationsProjects = new restful(
  sequelize.models.organizations_projects
)
const vulnerabilities = new restful(sequelize.models.vulnerabilities)

const findAll = async (req, res) => {}

const findOne = async (req, res) => {}

const softDelete = async (req, res) => {}

const update = async (req, res) => {}

const create = async (req, res) => {
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
    description
  } = req.body

  const data = {
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
    description
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
  softDelete
}
