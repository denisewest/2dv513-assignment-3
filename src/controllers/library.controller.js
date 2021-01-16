/**
 * The controller for book schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const Library = require('../models/library.model')

exports.findLibraryByName = (req, res) => {
  // check if name params exists
  if (!req.query.name) {
    res.status(404)
  }

  Library.getLibraryByName(req.query.name, (err, data) => {
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
      console.log('library_data: ', data)
      res.send(data)
    }
  })
}
