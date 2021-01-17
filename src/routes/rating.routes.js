/**
 * The routes for book schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

module.exports = app => {
  const rating = require('../controllers/rating.controller')

  app.get('/ratings/all', rating.findAllRatings)
  app.get('/ratings', rating.findBookByAverageScore)
}
