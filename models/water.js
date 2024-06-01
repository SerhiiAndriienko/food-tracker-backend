const { required, version } = require('joi')
const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const waterSchema = new mongoose.Schema(
	{
		value: {
			type: Number,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, timestamps: false }
)
module.exports = mongoose.model('Water', waterSchema)
