const sql = require('./db.js')

const Book = function (book) {
  this.id = book.id
  this.title = book.title
  this.isbn = book.isbn
  this.author = book.author
  this.publishing_year = book.publishing_year
  this.publisher = book.publisher
  this.genre = book.genre
  this.description = book.description
  this.availability = book.availability
  this.loan_period = book.loan_period
  this.member_id = book.member_id
  this.library_id = book.library_id
}

Book.getBookByTitle = (title, result) => {
  sql.query(
    `SELECT DISTINCT title, author, publishing_year, isbn, description FROM book WHERE title LIKE '%${title}%' ORDER BY publishing_year;`,

    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }
      if (res.affectedRows === 0) {
        result({ kind: 'not_found' }, null)
      }
      result(null, res)
    }
  )
}

module.exports = Book
