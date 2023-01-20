const { Router } = require('express')
const bodyParser = require('body-parser')
const router = Router()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const { hunters } = require('../../controllers')
router.put('/iban', hunters.profile.updateIban)
router.put('/social-networks', hunters.profile.updateSocialNetworkData)
router.put('/change-password', hunters.profile.changePassword)
router.get('/', hunters.profile.findOne)

module.exports = router
