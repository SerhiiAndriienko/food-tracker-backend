const Water = require('../models/water')
const mongoose = require('mongoose')
async function getValue(req, res, next) {
	try {
		const today = new Date()
		const formattedDate = `${today.getDate()}-${
			today.getMonth() + 1
		}-${today.getFullYear()}`
		const docs = await Water.find({ date: formattedDate }).exec()
		return res.send(docs)
	} catch (error) {
		next(error)
	}
}

async function addWater(req, res, next) {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message:
				'Invalid ObjectId. A valid ObjectId is a 24-character hex string.',
		})
	}
	const today = new Date()
	const formattedDate = `${today.getDate()}-${
		today.getMonth() + 1
	}-${today.getFullYear()}`
	const waterValue = {
		value: req.body.value,
		date: formattedDate,
	}
	try {
		const doc = await Water.findByIdAndUpdate(
			id,
			{ $set: waterValue },
			{ new: true, upsert: true, useFindAndModify: false }
		).exec()

		return res.status(200).send(doc)
	} catch (error) {
		next(error)
	}
}

async function removeValue(req, res, next) {
	const { id } = req.params

	try {
		const doc = await Water.findByIdAndRemove(id).exec()
		if (doc === null) {
			return res.status(404).send({ message: 'Water value not found' })
		}
		return res.status(204).send()
	} catch (error) {
		next(error)
	}
}

module.exports = { getValue, addWater, removeValue }
