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
      console.log('rating_data: ', data)
      res.render('layouts/ratings', { data })
    }
  })
}

exports.findBookByAverageScore = (req, res) => {
  // check if title params exists
  if (!req.query.average) {
    res.status(404)
    return
  }

  Rating.getBookByAverageScore(req.query.average, (err, data) => {
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
      console.log('rating_data: ', data)
      res.send(data)
    }
  })
}
