const { Router } = require('express')
const router = Router()
const { passport } = require('../../middlewares')

const huntersPassport = passport.huntersPassport.authenticate('jwt', {
  session: false,
  failureRedirect: '/v1/failures/unauthorized'
})
router.use(passport.huntersPassport.initialize())
router.use('/auth', require('./auth.route'))
router.use('/profile', huntersPassport, require('./profile.route'))
router.use('/projects', huntersPassport, require('./projects.route'))
router.use('/reports', huntersPassport, require('./reports.route'))

module.exports = router
