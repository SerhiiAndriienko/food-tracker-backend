const express = require('express')
const router = express.Router()
const WaterController = require('../controllers/water')

const jsonParcer = express.json()
router.get('/', WaterController.getValue)
router.post('/:value', jsonParcer, WaterController.addWater)

router.put('/:id', jsonParcer, WaterController.updateWater)

router.delete('/:id', WaterController.removeValue)

module.exports = router
