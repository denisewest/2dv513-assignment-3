/**
 * The model for book schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const sql = require('./db')

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
      } else if (res.affectedRows === 0) {
        result({ kind: 'not_found' }, null)
      } else {
        console.log(`book titles with ${title}: `, res)
        result(null, res)
      }
    })
}

Book.getAverageScorePerBook = result => {
  sql.query(
    'SELECT book.title, book.author, book.isbn, AVG(rating.score) AS \'average_score\' FROM book INNER JOIN rating ON book.isbn=rating.isbn GROUP BY book.isbn ORDER BY AVG(rating.score) DESC;',
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
      } else {
        console.log('book average score: ', res)
        result(null, res)
      }
    })
}

module.exports = Book
