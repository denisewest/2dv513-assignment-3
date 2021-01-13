module.exports = app => {
  const book = require('../controllers/book.controller.js')

  app.get('/book', book.findBookByTitle)
}
