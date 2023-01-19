const { Router } = require('express')
const bodyParser = require('body-parser')
const router = Router()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const { admins } = require('../../controllers')
router.put('/id/:id', admins.organizations.update)
router.delete('/id/:id', admins.organizations.softDelete)
router.get('/id/:id', admins.organizations.findOne)
router.get('/', admins.organizations.findAll)

module.exports = router
