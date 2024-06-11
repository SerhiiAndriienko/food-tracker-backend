const jwt = require('jsonwebtoken')
const httpError = require('../helpers/errors')
const { User } = require('../models/user')
const { JWT_SECRET } = process.env

const noAuth = 'No authorized'

const auth = async (req, res, next) => {
	const { authorization = '' } = req.headers

	const [bearer, token] = authorization.split(' ')
	if (!bearer) return next(httpError(401, noAuth))

	try {
		const { id } = jwt.verify(token, JWT_SECRET)

		const user = await User.findById(id).exec()
		if (!user || !user.token || user.token !== token)
			return next(httpError(401, noAuth))

		req.user = user

		return next()
	} catch {
		return next(httpError(401, noAuth))
	}
}

module.exports = auth
