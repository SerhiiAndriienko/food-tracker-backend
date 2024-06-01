const express = require('express')
const router = express.Router()
const bookRoutes = require('./books')
const waterRoutes = require('./waters')
const authRoutes = require('./auth')
const dayRoutes = require('./days')

router.use('/days', dayRoutes)
router.use('/auth', authRoutes)
router.use('/books', bookRoutes)
router.use('/water', waterRoutes)

module.exports = router
