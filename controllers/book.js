const Book = require('../models/book')

async function getAll(req, res, next) {
	try {
		const docs = await Book.find().exec()
		return res.send(docs)
	} catch (error) {
		next(error)
	}
}
async function create(req, res, next) {
	const book = {
		title: req.body.title,
		author: req.body.author,
		genre: req.body.genre,
		year: req.body.year,
	}
	try {
		const doc = await Book.create(book)
		return res.status(201).send(doc)
	} catch (error) {
		next(error)
	}
}
async function getById(req, res, next) {
	const { id } = req.params
	try {
		const doc = await Book.findById(id).exec()
		if (doc === null) {
			return res.status(404).send({ message: 'Book not found' })
		}
		return res.status(200).send(doc)
	} catch (error) {
		next(error)
	}
}

async function update(req, res, next) {
	const { id } = req.params
	const book = {
		title: req.body.title,
		author: req.body.author,
		genre: req.body.genre,
		year: req.body.year,
	}
	try {
		const doc = await Book.findByIdAndUpdate(id, book, { new: true }).exec()

		if (
			(doc.title === book.title) &
			(doc.author === book.author) &
			(doc.genre === book.genre) &
			(doc.year === book.year)
		) {
			return res.status(404).send({ message: 'Nothing to change' })
		}
		if (doc === null) {
			return res.status(404).send({ message: 'Book not found' })
		}

		return res.status(200).send(doc)
	} catch (error) {
		next(error)
	}
}

async function remove(req, res, next) {
	const { id } = req.params

	try {
		const doc = await Book.findByIdAndRemove(id).exec()
		if (doc === null) {
			return res.status(404).send({ message: 'Book not found' })
		}
		return res.status(204).send()
	} catch (error) {
		next(error)
	}
}

module.exports = { getAll, create, getById, update, remove }
