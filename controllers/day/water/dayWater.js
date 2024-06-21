const Day = require('../../../models/day')
const currentDate = new Date()

const formattedDate = `${currentDate.getDate()}-${
	currentDate.getMonth() + 1
}-${currentDate.getFullYear()}`

async function updateWater(req, res, next) {
	const { id } = req.params
	const newValue = req.body.value
	if (newValue > 5000) {
		return res.status(400).send({
			message:
				'Water value cannot be greater than 5000. Please enter a value less than 5000',
		})
	}
	try {
		const updateDay = await Day.findByIdAndUpdate(
			id,
			{ $inc: { water: newValue } },
			{ new: true, upsert: true, useFindAndModify: false }
		).exec()

		return res.status(200).send(updateDay)
	} catch (error) {
		next(error)
	}
}

async function deleteWater(req, res, next) {
	const { id } = req.params

	try {
		const doc = await Day.findByIdAndUpdate(
			id,
			{ $set: { water: 0 } },
			{ new: true, upsert: true, useFindAndModify: false }
		).exec()
		if (doc === null) {
			return res.status(404).send({ message: 'Water value not found' })
		}
		return res.status(200).send(doc)
	} catch (error) {
		next(error)
	}
}

module.exports = { updateWater, deleteWater }
