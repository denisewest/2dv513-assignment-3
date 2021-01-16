/**
 * The model for member schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const sql = require('./db')

const Member = function (member) {
  this.id = member.id
  this.name = member.name
  this.city = member.city
  this.startdate = member.startdate
}

Member.getNumberOfMemberLoans = result => {
  sql.query('SELECT member.id, member.name, COUNT(book.id) AS \'number_of_loans\' FROM book INNER JOIN member ON book.member_id=member.id GROUP BY member.name ORDER BY COUNT(book.id) DESC;',
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
      } else {
        console.log('number of loans: ', res)
        result(null, res)
      }
    })
}

module.exports = Member
