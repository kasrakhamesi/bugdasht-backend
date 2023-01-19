const { Router } = require('express')
const router = Router()

router.use('/organizations', require('./organizations'))
//router.use('/hunters', require('./hunters'))
router.use('/failures', require('./failures'))
router.use('/admins', require('./admins'))

module.exports = router
