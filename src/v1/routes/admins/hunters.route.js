const { Router } = require('express')
const bodyParser = require('body-parser')
const router = Router()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const { admins } = require('../../controllers')

router.get('/reports/id/:id', admins.reports.findOne)
router.put('/reports/id/:id', admins.reports.update)
router.get('/reports', admins.reports.findAll)

router.put('/id/:id', admins.hunters.update)
router.delete('/id/:id', admins.hunters.softDelete)
router.get('/id/:id', admins.hunters.findOne)
router.get('/', admins.hunters.findAll)

module.exports = router
