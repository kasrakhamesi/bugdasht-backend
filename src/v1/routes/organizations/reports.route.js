const { Router } = require('express')
const bodyParser = require('body-parser')
const router = Router()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const { organizations } = require('../../controllers')

router.get('/id/:id', organizations.reports.findOne)
router.get('/', organizations.reports.findAll)

module.exports = router
