const Book = require('../models/book.model.js')

exports.findBookByTitle = (req, res) => {
  // check if title params exists
  if (!req.params.title) {
    res.status(404)
    return
  }

  Book.getBookByTitle(req.params.title, (err, data) => {
    if (err) {
      console.log(err)

      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Result with search ${req} was not found`
        })
      } else {
        res.status(500).send({
          message: err.message || 'Error occurred while trying to retrieve data'
        })
      }
    } else {
      console.log('tje', data)
      res.send(data)
    }
  })
}
