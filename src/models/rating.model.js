/**
 * The model for rating schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const sql = require('./db')

const Rating = function (rating) {
  this.score = rating.score
  this.review = rating.review
  this.isbn = rating.isbn
  this.member_id = rating.member_id
}

Rating.getTotalAverageScore = result => {
  sql.query(
    'SELECT AVG(score) AS \'average_score\' FROM rating;',
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
      } else if (res.affectedRows === 0) {
        result({ kind: 'not_found' }, null)
      } else {
        console.log('total average: ', res)
        result(null, res)
      }
    })
}

module.exports = Rating
