const { Router } = require('express')
const router = Router()
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
const { hunters } = require('../../controllers')

router.get('/id/:id', hunters.reports.findOne)
router.put('/id/:id', hunters.reports.update)
router.get('/', hunters.reports.findAll)

module.exports = router
