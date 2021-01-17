/**
 * The routes for book schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

module.exports = app => {
  const book = require('../controllers/book.controller')

  app.get('/books', (req, res) => {
    if (req.query.author) {
      return book.findBookByAuthor(req, res)
    }
    if (req.query.title) {
      return book.findBookByTitle(req, res)
    }

    if (req.query.isbn) {
      return book.findBookByIsbn(req, res)
    }

    if (req.query.year) {
      return book.findBookByPublishingYear(req, res)
    }
  })

  app.get('/books/all', book.findAllBooks)
  app.get('/books/available', book.findAvailableBooks)
  app.get('/books/average', book.findAverageScorePerBook)
}
