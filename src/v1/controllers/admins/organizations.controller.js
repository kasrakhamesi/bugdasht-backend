const { sequelize } = require('../../models')
const { restful, filters } = require('../../libs')
const { httpError } = require('../../configs')
const bcrypt = require('bcrypt')
const organizations = new restful(sequelize.models.organizations)

const findOne = async (req, res) => {
  try {
    const { id } = req.params

    const r = await organizations.Get({
      where: {
        id
      },
      attributes: {
        exclude: ['password']
      },
      findOne: true
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
      sequelize.models.organizations
    )

    const r = await organizations.Get({
      where,
      attributes: {
        exclude: ['password']
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

const update = async (req, res) => {
  try {
    const { id } = req.params
    const { status, username, password } = req.body
    const adminId = req?.user[0]?.id

    const data = {
      username,
      password: bcrypt.hashSync(password, 12),
      status,
      adminId
    }

    const r = await organizations.Put({ body: data, where: { id } })
    return res.status(r?.statusCode).send(r)
  } catch (e) {
    return httpError(e, res)
  }
}

const softDelete = async (req, res) => {
  try {
    const { id } = req.params
    const r = await organizations.Delete({ where: { id } })
    return res.status(r?.statusCode).send(r)
  } catch (e) {
    return httpError(e, res)
  }
}

module.exports = { findAll, update, softDelete, findOne }
