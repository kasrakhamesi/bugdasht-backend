const { sequelize } = require('../../models')
const { restful, filters } = require('../../libs')
const { httpError } = require('../../configs')
const bcrypt = require('bcrypt')
const hunters = new restful(sequelize.models.hunters)

const findOne = async (req, res) => {
  try {
    const { id } = req.params

    const r = await hunters.Get({
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
      sequelize.models.hunters
    )

    const r = await hunters.Get({
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
    const {
      nationalCode,
      nickName,
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      email,
      shebaNumber,
      twitter,
      linkedin,
      bugCrowd,
      password,
      hackerOne
    } = req.body

    const data = {
      nationalCode,
      nickName,
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      email,
      shebaNumber,
      twitter,
      linkedin,
      bugCrowd,
      password,
      hackerOne
    }

    const r = await hunters.Put({ body: data, where: { id } })
    return res.status(r?.statusCode).send(r)
  } catch (e) {
    return httpError(e, res)
  }
}

const softDelete = async (req, res) => {
  try {
    const { id } = req.params
    const r = await hunters.Delete({ where: { id } })
    return res.status(r?.statusCode).send(r)
  } catch (e) {
    return httpError(e, res)
  }
}

module.exports = { findAll, update, softDelete, findOne }
