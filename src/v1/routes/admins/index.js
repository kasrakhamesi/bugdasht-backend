const { Router } = require('express')
const router = Router()
const { passport } = require('../../middlewares')

const adminsPassport = passport.adminsPassport.authenticate('jwt', {
  session: false,
  failureRedirect: '/v1/failures/unauthorized'
})
router.use(passport.adminsPassport.initialize())
router.use('/auth', require('./auth.route'))
router.use('/organizations', adminsPassport, require('./organizations.route'))
router.use('/hunters', adminsPassport, require('./hunters.route'))

module.exports = router
