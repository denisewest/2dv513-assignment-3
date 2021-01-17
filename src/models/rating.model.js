/**
 * The model for rating schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const sql = require('./db')

const Rating = function (rating) {
  this.score = rating.score
  this.review = rating.review
  this.isbn = rating.isbn
  this.member_id = rating.member_id
}

Rating.getAllRatings = result => {
  sql.query('SELECT book.title, book.author, book.isbn, rating.score, rating.review, member.name FROM book, rating, member WHERE book.isbn = rating.isbn AND rating.member_id = member.id GROUP BY rating.id ORDER BY book.title;',
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
      } else {
        console.log('all_ratings: ', res)
        result(null, res)
      }
    })
}

Rating.getBookByAverageScore = (average, result) => {
  sql.query(
    `CREATE OR REPLACE VIEW \`Books average score\` AS
    SELECT AVG(rating.score) AS 'average_score', rating.isbn, book.title, book.author
    FROM rating
    INNER JOIN book ON book.isbn = rating.isbn
    GROUP BY isbn;

    SELECT * FROM \`Books average score\` WHERE average_score>=${average} ORDER BY average_score ASC;
    `,
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
      } else if (res.affectedRows === 0) {
        console.log(`no books with average ${average} found.`)
        result({ kind: 'not_found' }, null)
      } else {
        console.log(`books with ${average}: `, res)
        result(null, res)
      }
    })
}

module.exports = Rating
