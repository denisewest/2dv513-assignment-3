/**
 * The routes for book schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

module.exports = app => {
  const rating = require('../controllers/rating.controller')

  app.get('/ratings', (req, res) => {
    if (req.query.average_score) {
      return rating.findBookByAverageScore(req, res)
    }
  })

  app.get('/ratings/all', rating.findAllRatings)
}
