const Day = require('../../../models/day')
const currentDate = new Date()

const formattedDate = `${currentDate.getDate()}-${
	currentDate.getMonth() + 1
}-${currentDate.getFullYear()}`

async function updateFood(req, res, next) {
	const { id } = req.params
	const { mealsType, food } = req.body
	let updateField

	switch (mealsType) {
		case 'breakfast':
			updateField = { breakfast: food }

			break
		case 'lunch':
			updateField = { lunch: food }

			break
		case 'dinner':
			updateField = { dinner: food }

			break
		case 'snack':
			updateField = { snack: food }

			break
		default:
			return res.status(400).send({ message: 'Invalid meal type' })
	}

	try {
		const updateDay = await Day.findByIdAndUpdate(
			id,
			{ $push: updateField },
			{ new: true, upsert: true, useFindAndModify: false }
		).exec()

		return res.status(200).send(updateDay)
	} catch (error) {
		next(error)
	}
}
module.exports = { updateFood }
