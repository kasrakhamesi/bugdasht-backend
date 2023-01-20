const { authorize } = require('../../middlewares')
const { httpError, errorTypes } = require('../../configs')
const { sequelize } = require('../../models')
const bcrypt = require('bcrypt')
const { utils } = require('../../libs')

const create = async (req, res) => {}

const findOne = async (req, res) => {}

const findAll = async (req, res) => {}

const update = async (req, res) => {}

module.exports = { create, findOne, findAll, update }
