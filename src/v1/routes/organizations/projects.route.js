const { Router } = require('express')
const bodyParser = require('body-parser')
const router = Router()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const { organizations } = require('../../controllers')

router.get('/vulnerabilities', organizations.projects.findAllVulnerabilities)

router.put('/id/:id', organizations.projects.update)
router.get('/id/:id', organizations.projects.findOne)
router.get('/', organizations.projects.findAll)
router.post('/', organizations.projects.create)

module.exports = router
