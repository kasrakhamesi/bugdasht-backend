const { Router } = require('express')
const bodyParser = require('body-parser')
const router = Router()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const { hunters } = require('../../controllers')
router.post('/register', hunters.auth.register)
router.post('/login', hunters.auth.login)
router.get('/', hunters.auth.findOne)

module.exports = router
