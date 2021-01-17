/**
 * The controller for book schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const Book = require('../models/book.model')

exports.findAllBooks = (req, res) => {
  Book.getAllBooks((err, data) => {
    if (err) {
      console.log('error: ', err)
    } else {
      console.log('book_data: ', data)
      res.render('layouts/books', { data })
    }
  })
}

exports.findAvailableBooks = (req, res) => {
  Book.getAvailableBooks((err, data) => {
    if (err) {
      console.log('error: ', err)
    } else {
      console.log('book_data: ', data)
      res.render('layouts/books', { data })
    }
  })
}

exports.findBookByPublishingYear = (req, res) => {
  // check if title params exists
  if (!req.query.year) {
    res.status(404)
  }

  Book.getBookByPublishingYear(req.query.year, (err, data) => {
    if (err) {
      console.log('error: ', err)

      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No result for search ${req} was found`
        })
      } else {
        res.status(500).send({
          message: err.message || 'Error occurred while trying to retrieve data'
        })
      }
    } else {
      console.log('book_data: ', data)
      res.send(data)
    }
  })
}

exports.findBookByIsbn = (req, res) => {
  // check if title params exists
  if (!req.query.isbn) {
    res.status(404)
  }

  Book.getBookByIsbn(req.query.isbn, (err, data) => {
    if (err) {
      console.log('error: ', err)

      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No result for search ${req} was found`
        })
      } else {
        res.status(500).send({
          message: err.message || 'Error occurred while trying to retrieve data'
        })
      }
    } else {
      console.log('book_data: ', data)
      res.send(data)
    }
  })
}

exports.findBookByAuthor = (req, res) => {
// check if title params exists
  if (!req.query.author) {
    res.status(404)
  }

  Book.getBookByAuthor(req.query.author, (err, data) => {
    if (err) {
      console.log('error: ', err)

      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No result for search ${req} was found`
        })
      } else {
        res.status(500).send({
          message: err.message || 'Error occurred while trying to retrieve data'
        })
      }
    } else {
      console.log('book_data: ', data)
      res.send(data)
    }
  })
}

exports.findBookByTitle = (req, res) => {
  // check if title params exists
  if (!req.query.title) {
    res.status(404)
    return
  }

  Book.getBookByTitle(req.query.title, (err, data) => {
    if (err) {
      console.log('error: ', err)

      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No result for search ${req} was found`
        })
      } else {
        res.status(500).send({
          message: err.message || 'Error occurred while trying to retrieve data'
        })
      }
    } else {
      console.log('book_data: ', data)
      res.send(data)
    }
  })
}

exports.findAverageScorePerBook = (req, res) => {
  Book.getAverageScorePerBook((err, data) => {
    if (err) {
      console.log('error: ', err)
    } else {
      console.log('book_data: ', data)
      res.send(data)
    }
  })
}
