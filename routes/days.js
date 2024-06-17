const express = require('express')
const DayController = require('../controllers/day')

const router = express.Router()

const jsonParser = express.json()

router.post('/createDay', jsonParser, DayController.createDay)
router.get('/:id', jsonParser, DayController.getDay)

router.put('/updateWater/:id', jsonParser, DayController.updateWater)
router.post('/deleteWater/:id', jsonParser, DayController.deleteWater)
router.post('/updateFood/:id', jsonParser, DayController.updateFood)

module.exports = router
