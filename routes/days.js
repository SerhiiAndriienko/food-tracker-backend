const express = require('express')
const DayController = require('../controllers/day')

const router = express.Router()

const jsonParser = express.json()
router.post('/createDay', jsonParser, DayController.createDay)

module.exports = router
