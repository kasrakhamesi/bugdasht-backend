const { Router } = require('express')
const bodyParser = require('body-parser')
const router = Router()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const { organizations } = require('../../controllers')
router.post('/pre-register', organizations.auth.preRegister)
router.post('/login', organizations.auth.login)

module.exports = router
