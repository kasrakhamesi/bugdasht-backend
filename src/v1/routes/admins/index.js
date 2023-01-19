const { Router } = require('express')
const router = Router()
const { passport } = require('../../middlewares')
const { admins } = require('../../controllers')

const adminsPassport = passport.adminsPassport.authenticate('jwt', {
  session: false,
  failureRedirect: '/v1/failures/unauthorized'
})
router.use(passport.adminsPassport.initialize())
router.use('/auth', require('./auth.route'))
router.use('/organizations', adminsPassport, require('./organizations.route'))
router.use('/hunters', adminsPassport, require('./hunters.route'))
router.use('/profile', adminsPassport, require('./profile.route'))

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.put('/id/:id', adminsPassport, admins.admins.update)
router.get('/id/:id', adminsPassport, admins.admins.findOne)
router.delete('/id/:id', adminsPassport, admins.admins.softDelete)
router.get('/', adminsPassport, admins.admins.findAll)
router.post('/', adminsPassport, admins.admins.create)

module.exports = router
