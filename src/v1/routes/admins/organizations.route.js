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

router.get(
  '/projects/id/:id/reports',
  admins.projects.findAllReportsByProjectId
)
router.put('/projects/id/:id', admins.projects.update)
router.get('/projects/id/:id', admins.projects.findOne)
router.get('/projects', admins.projects.findAll)

module.exports = router
