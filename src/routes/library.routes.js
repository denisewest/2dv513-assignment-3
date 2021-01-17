/**
 * The routes for book schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

module.exports = app => {
  const library = require('../controllers/library.controller')

  app.get('/libraries', (req, res) => {
    if (req.query.name) {
      return library.findLibraryByName(req, res)
    }
  })

  app.get('/libraries/all', library.findAllLibraries)
}
