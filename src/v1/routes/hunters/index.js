const { Router } = require('express')
const router = Router()
const { passport } = require('../../middlewares')

const huntersPassport = passport.huntersPassport.authenticate('jwt', {
  session: false,
  failureRedirect: '/v1/failures/unauthorized'
})
router.use(passport.huntersPassport.initialize())
router.use('/auth', require('./auth.route'))

module.exports = router
