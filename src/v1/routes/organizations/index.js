const { Router } = require('express')
const router = Router()
const { passport } = require('../../middlewares')

const organizationsPassport = passport.organizationsPassport.authenticate(
  'jwt',
  {
    session: false,
    failureRedirect: '/v1/failures/unauthorized'
  }
)
router.use(passport.organizationsPassport.initialize())
router.use('/auth', require('./auth.route'))

module.exports = router
