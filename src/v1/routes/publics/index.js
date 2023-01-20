const { Router } = require('express')
const router = Router()

const { publics } = require('../../controllers')

router.use('/projects/id/:id', publics.projects.findOne)
router.use('/projects', publics.projects.findAll)

module.exports = router
