/**
 * The routes for book schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

module.exports = app => {
  const book = require('../controllers/book.controller.js')

  app.get('/books/title/:title', book.findBookByTitle)
  app.get('/books/average', book.findAverageScorePerBook)
}
