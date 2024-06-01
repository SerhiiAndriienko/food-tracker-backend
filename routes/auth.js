const express = require('express')
const AuthController = require('../controllers/auth')

const router = express.Router()

const jsonParser = express.json()
router.post('/register', jsonParser, AuthController.register)

module.exports = router