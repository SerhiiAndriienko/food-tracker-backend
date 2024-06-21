const express = require('express')
const DayController = require('../controllers/day')
const DayWaterController = require('../controllers/day/water/dayWater')

const DayFoodController = require('../controllers/day/food/dayFood')

const router = express.Router()

const jsonParser = express.json()

router.post('/createDay', jsonParser, DayController.createDay)
router.get('/:id', jsonParser, DayController.getDay)

router.post('/updateFood/:id', jsonParser, DayFoodController.updateFood)

router.put('/updateWater/:id', jsonParser, DayWaterController.updateWater)
router.post('/deleteWater/:id', jsonParser, DayWaterController.deleteWater)
module.exports = router
