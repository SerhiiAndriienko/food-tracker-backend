const express = require('express')
const router = express.Router()
const WaterController = require('../controllers/water')

const jsonParcer = express.json()
router.get('/', WaterController.getValue)

router.put('/:id', jsonParcer, WaterController.addWater)

router.delete('/:id', WaterController.removeValue)

module.exports = router
