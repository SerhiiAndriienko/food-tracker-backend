const express = require('express')
const router = express.Router()

const userRoutes = require('./api/user')
const dayRoutes = require('./days')
const auth = require('../middleware/auth')

router.use('/days', dayRoutes)
router.use('/users', auth, userRoutes)

module.exports = router
