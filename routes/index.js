const express = require('express')
const router = express.Router()
const bookRoutes = require('./books')
const waterRoutes = require('./waters')
const userRoutes = require('./api/user')
const dayRoutes = require('./days')
const auth = require('../middleware/auth')

router.use('/days', dayRoutes)
router.use('/user', auth, userRoutes)
router.use('/books', bookRoutes)
router.use('/water', waterRoutes)

module.exports = router
