const { sequelize } = require('../../models')
const { restful, filters } = require('../../libs')
const { httpError } = require('../../configs')
const organizationsProjects = new restful(
  sequelize.models.organizations_projects
)
const vulnerabilities = new restful(sequelize.models.vulnerabilities)

const create = async (req, res) => {
  try {
  } catch (e) {
    return httpError(e?.message, res)
  }
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

    return res.status(r?.statusCode).send(r)
  } catch (e) {
    return httpError(e, res)
  }
}

module.exports = { findAllVulnerabilities }
