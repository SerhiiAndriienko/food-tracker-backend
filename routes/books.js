const express = require('express')
const router = express.Router()
const BookController = require('../controllers/book')

const jsonParcer = express.json()
router.get('/', BookController.getAll)
router.post('/', jsonParcer, BookController.create)

router.get('/:id', BookController.getById)
router.put('/:id', jsonParcer, BookController.update)
router.delete('/:id', BookController.remove)

module.exports = router
