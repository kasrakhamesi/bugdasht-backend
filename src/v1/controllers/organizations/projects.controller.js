const { httpError } = require('../../configs')
const { sequelize } = require('../../models')

const create = async (req, res) => {
  try {
  } catch (e) {
    return httpError(e?.message, res)
  }
}

const findAllVulnerabilities = async (req, res) => {
  try {
  } catch (e) {
    return httpError(e?.message, res)
  }
}
