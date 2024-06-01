const mongoose = require('mongoose')
const app = require('./app')
const { DB_HOST, PORT } = process.env

mongoose.set('strictQuery', true)

mongoose
	.connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(PORT)
		console.log(`Server running. Use our API on port: ${DB_HOST} ${PORT} `)
	})
	.catch(err => {
		console.error('Database connection error:', err.message)
		process.exit(1)
	})
