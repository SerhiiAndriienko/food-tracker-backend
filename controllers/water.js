const Water = require('../models/water')
const mongoose = require('mongoose')
async function getValue(req, res, next) {
	try {
		const today = new Date()
		const formattedDate = `${today.getDate()}-${
			today.getMonth() + 1
		}-${today.getFullYear()}`
		const docs = await Water.find({ date: formattedDate }).exec()
		docs[0]
			? res.send({ value: docs[0].value, id: docs[0]._id })
			: res.send({ value: 0, id: '' })
	} catch (error) {
		next(error)
	}
}

async function updateWater(req, res, next) {
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
	// const newWaterLevel =
	const newValue = req.body.value

	try {
		const doc = await Water.findByIdAndUpdate(
			id,
			{ $inc: { value: newValue }, $set: { date: formattedDate } },
			{ new: true, upsert: true, useFindAndModify: false }
		).exec()

		return res.status(200).send(doc)
	} catch (error) {
		next(error)
	}
}
async function addWater(req, res, next) {
	const { value } = req.params
	const today = new Date()
	const formattedDate = `${today.getDate()}-${
		today.getMonth() + 1
	}-${today.getFullYear()}`

	try {
		const waterValue = await Water.create({
			value: value,
			date: formattedDate,
		})

		return res.status(200).send(waterValue)
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

module.exports = { getValue, addWater, removeValue, updateWater }
