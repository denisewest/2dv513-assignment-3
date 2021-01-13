/**
 * The starting point of the application.
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const helmet = require('helmet')
const bodyparser = require('body-parser')
const app = express()
const dotenv = require('dotenv')

dotenv.config()

app.use(helmet())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to this library application.' })
})

const portNumber = 2000

require('./src/routes/book.routes.js')(app)

app.listen(portNumber, () => {
  console.log('Server is running on port ' + portNumber + '.')
})
