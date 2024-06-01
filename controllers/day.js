const day = require('../models/day')

const currentDate = new Date()
const startOfDay = new Date(currentDate.toISOString().split('T')[0])
const endOfDay = new Date(startOfDay)
endOfDay.setHours(23, 59, 59, 999)

const createDay = async (req, res, next) => {
	try {
		const data = await day.create(req.body)

		res.status(201).send(data)
	} catch (error) {
		next(error)
	}
}
module.exports = { createDay }
