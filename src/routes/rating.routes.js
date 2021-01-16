/**
 * The routes for book schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

module.exports = app => {
  const rating = require('../controllers/rating.controller.js')

  app.get('/rating', rating.findTotalAverageScore)
}
