const { Router } = require('express')
const bodyParser = require('body-parser')
const router = Router()
const { hunters } = require('../../controllers')

const fileUpload = require('express-fileupload')
router.use(
  fileUpload({
    defCharset: 'utf8',
    defParamCharset: 'utf8',
    limits: { fileSize: 200 * 1024 * 1024 },
    safeFileNames: true,
    abortOnLimit: true,
    preserveExtension: true,
    createParentPath: true
  })
)

router.put('/', hunters.profile.update)

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
router.put('/bank-accounts', hunters.profile.updateIban)
router.put('/social-networks', hunters.profile.updateSocialNetworkData)
router.put('/change-password', hunters.profile.changePassword)
router.get('/', hunters.profile.findOne)

module.exports = router
