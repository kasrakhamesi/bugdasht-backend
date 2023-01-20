const { Router } = require('express')
const router = Router()

router.use('/failures', require('./failures'))
router.use('/publics', require('./publics'))
router.use('/organizations', require('./organizations'))
router.use('/hunters', require('./hunters'))
router.use('/admins', require('./admins'))

module.exports = router
