/**
 * The controller for book schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const Book = require('../models/book.model.js')

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
      console.log('data: ', data)
      res.send(data)
    }
  })
}

exports.findAverageScorePerBook = (req, res) => {
  Book.getAverageScorePerBook((err, data) => {
    if (err) {
      console.log('error: ', err)
    } else {
      console.log('data: ', data)
      res.send(data)
    }
  })
}
