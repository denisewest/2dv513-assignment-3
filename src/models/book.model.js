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

// Get all books available in the library database
Book.getAllBooks = (result) => {
  sql.query('SELECT DISTINCT book.title, book.author, book.publishing_year, book.isbn, book.description, book.availability, library.name, library.city FROM book INNER JOIN library ON book.library_id = library.id ORDER BY book.title;',
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
      } else {
        result(null, res)
      }
    })
}

// Get all books that are available for borrowing
Book.getAvailableBooks = (result) => {
  sql.query('SELECT book.title, book.author, book.publishing_year, book.isbn, book.description, book.availability, library.name, library.city FROM book INNER JOIN library ON book.library_id=library.id WHERE book.availability=1;',
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
      } else {
        result(null, res)
      }
    })
}

// Search book(s) by publishing year
Book.getBookByPublishingYear = (year, result) => {
  sql.query(`SELECT book.publishing_year, book.title, book.author, book.isbn, book.description, library.name, library.city
  FROM book
  INNER JOIN library ON book.library_id = library.id
  WHERE book.publishing_year=${year}
  ORDER BY book.title DESC;`,
  (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else if (res.affectedRows === 0) {
      console.log(`no book from year ${year} found.`)
      result({ kind: 'not_found' }, null)
    } else {
      result(null, res)
    }
  })
}

// Get book(s) by ISBN number
Book.getBookByIsbn = (isbn, result) => {
  sql.query(
  `SELECT book.isbn, book.title, book.author, book.publishing_year, book.description, library.name, library.city
  FROM book
  INNER JOIN library ON book.library_id = library.id
  WHERE book.isbn LIKE '%${isbn}%'
  ORDER BY book.title DESC;`,
  (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else if (res.affectedRows === 0) {
      console.log(`no book with isbn ${isbn} found.`)
      result({ kind: 'not_found' }, null)
    } else {
      result(null, res)
    }
  })
}

// Get book(s) by author
Book.getBookByAuthor = (author, result) => {
  sql.query(
  `SELECT book.author, book.title, book.publishing_year, book.isbn, book.description, library.name, library.city
  FROM book
  INNER JOIN library ON book.library_id = library.id
  WHERE author LIKE '%${author}%'
  ORDER BY book.publishing_year DESC;`,
  (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else if (res.affectedRows === 0) {
      console.log(`no book authors with name ${author} found.`)
      result({ kind: 'not_found' }, null)
    } else {
      result(null, res)
    }
  })
}

// Get book(s) by title
Book.getBookByTitle = (title, result) => {
  sql.query(
    `SELECT book.title, book.author, book.publishing_year, book.isbn, book.description, library.name, library.city
    FROM book 
    INNER JOIN library ON book.library_id = library.id
    WHERE title LIKE '%${title}%' 
    ORDER BY publishing_year;`,
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
      } else if (res.affectedRows === 0) {
        console.log(`no book titles with ${title} found.`)
        result({ kind: 'not_found' }, null)
      } else {
        result(null, res)
      }
    })
}

// Get average score for each book
Book.getAverageScorePerBook = result => {
  sql.query(
    'SELECT book.title, book.author, book.isbn, AVG(rating.score) AS \'average_score\' FROM book INNER JOIN rating ON book.isbn=rating.isbn GROUP BY book.isbn ORDER BY AVG(rating.score) DESC;',
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
      } else {
        result(null, res)
      }
    })
}

module.exports = Book
