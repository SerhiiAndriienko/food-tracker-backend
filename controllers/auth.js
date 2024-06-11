const express = require('express')
const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const error = 'Email or Password is incorrect'
const { JWT_SECRET } = process.env
async function register(req, res, next) {
	const { name, email, password } = req.body

	try {
		const isUserExist = await User.findOne({ email }).exec()
		if (isUserExist) {
			return res.status(409).send({ message: 'User already exist' })
		}
		const hashPass = await bcrypt.hash(password, 10)

		const newUser = await User.create({ name, email, password: hashPass })
		const payload = { id: newUser._id }
		const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' })
		const addTokenToNewUser = await User.findByIdAndUpdate(
			newUser._id,
			{ token },
			{ new: true }
		).exec()

		return res.status(201).send({
			name: addTokenToNewUser.name,
			email: addTokenToNewUser.email,
			token: addTokenToNewUser.token,
		})
	} catch (error) {
		next(error)
	}
}

async function login(req, res, next) {
	const { email, password } = req.body
	try {
		const isUserExist = await User.findOne({ email })
		if (!isUserExist) {
			return res.status(401).send({ message: error })
		}
		const isMatch = await bcrypt.compare(password, isUserExist.password)
		if (!isMatch) {
			return res.status(401).send({ message: error })
		}
		const payload = { id: isUserExist._id }
		const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' })
		const addTokenToUser = await User.findByIdAndUpdate(
			isUserExist._id,
			{ token },
			{ new: true }
		)

		res.status(200).send({
			name: addTokenToUser.name,
			email: addTokenToUser.email,

			token: addTokenToUser.token,
		})
	} catch (error) {
		next(error)
	}
}

module.exports = { register, login }
