/**
 * The controller for rating schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const Rating = require('../models/rating.model')

exports.findAllRatings = (req, res) => {
  Rating.getAllRatings((err, data) => {
    if (err) {
      console.log('error: ', err)
    } else {
      res.render('layouts/ratings', { data })
    }
  })
}

exports.findBookByAverageScore = (req, res) => {
  // check if title params exists
  if (!req.query.average_score) {
    res.status(404)
    return
  }

  Rating.getBookByAverageScore(req.query.average_score, (err, data) => {
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
      res.render('layouts/results', { ratings_book_score_average: data })
    }
  })
}
