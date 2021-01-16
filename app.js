/**
 * The starting point of the application.
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const hbs = require('express-hbs')
const express = require('express')
const helmet = require('helmet')
const bodyparser = require('body-parser')
const app = express()
const dotenv = require('dotenv')
const { join } = require('path')

dotenv.config()

app.use(helmet())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to this library application.' })
})

app.engine('hbs', hbs.express4({
  defaultLayout: join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', join(__dirname, 'views'))

app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')))

const portNumber = 2000

require('./src/routes/book.routes.js')(app)

app.listen(portNumber, () => {
  console.log(`Server is running at http://localhost:${portNumber}.`)
})
