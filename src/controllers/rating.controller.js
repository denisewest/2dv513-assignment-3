/**
 * The controller for rating schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const Rating = require('../models/rating.model.js')

exports.findTotalAverageScore = (req, res) => {
  Rating.getTotalAverageScore((err, data) => {
    if (err) {
      console.log('error: ', err)
    } else {
      console.log('data: ', data)
      res.send(data)
    }
  })
}
