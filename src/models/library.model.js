/**
 * The model for library schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const sql = require('./db')

const Library = function (library) {
  this.id = library.id
  this.name = library.name
  this.city = library.city
}

Library.getLibraryByName = (name, result) => {
  sql.query(`SELECT DISTINCT library.name, library.city, book.title, book.author, book.publishing_year, book.isbn, book.description
FROM book INNER JOIN library ON book.library_id=library.id WHERE library.name LIKE '%${name}%';`,
  (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
    } else if (res.affectedRows === 0) {
      result({ kind: 'not_found' }, null)
    } else {
      console.log(`libraries with name ${name}: `, res)
      result(null, res)
    }
  })
}

module.exports = Library
