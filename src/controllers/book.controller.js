const Book = require('../models/book.model.js')

exports.findBookByTitle = (req, res) => {
  Book.findBookByTitle((err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Result with search ${req} was not found`
        })
      } else {
        res.status(500).send({
          message: err.message || 'Error occurred while trying to retrieve data'
        })
      }
    } else res.send(data)
  })
}
