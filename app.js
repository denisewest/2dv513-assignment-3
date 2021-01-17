/**
 * The starting point of the application.
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const hbs = require('express-handlebars')
const helmet = require('helmet')
const bodyparser = require('body-parser')
const app = express()
const dotenv = require('dotenv')
const { join } = require('path')
const portNumber = 2000

dotenv.config()

// Middlewares
app.use(helmet())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static('./src/public'))

app.set('views', join(__dirname, './src/views'))
app.set('view engine', 'hbs')
app.engine('hbs', hbs({
  layoutsDir: './src/views/layouts',
  partialsDir: './src/views/partials',
  extname: 'hbs',
  defaultLayout: '../main'
}))

app.get('/', (req, res) => {
  res.render('layouts/home')
})

// Routes
require('./src/routes/book.routes')(app)
require('./src/routes/member.routes')(app)
require('./src/routes/library.routes')(app)
require('./src/routes/rating.routes')(app)

// Starting the server
app.listen(portNumber, () => {
  console.log(`Server is running at http://localhost:${portNumber}.`)
})
