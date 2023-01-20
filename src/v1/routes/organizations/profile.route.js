const { Router } = require('express')
const bodyParser = require('body-parser')
const router = Router()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const { organizations } = require('../../controllers')
router.put('/change-password', organizations.profile.changePassword)
router.get('/', organizations.profile.findOne)

module.exports = router
