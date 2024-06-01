const express = require('express')
const User = require('../models/user')

async function register(req, res, next) {
	const { name, email, password } = req.body
	try {
		const data = await User.create({ name, email, password })
		console.log(data)
	} catch (error) {
		next(error)
	}
	res.send('Register is OK')
}
module.exports = { register }
