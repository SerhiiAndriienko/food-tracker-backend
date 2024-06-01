const { required, version } = require('joi')
const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		genre: {
			type: String,
			required: true,
			enum: ['Action', 'History', 'War'],
		},
		year: {
			type: Number,
			required: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
)
module.exports = mongoose.model('Book', bookSchema)
