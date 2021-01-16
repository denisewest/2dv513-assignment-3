/**
 * The controller for member schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const Member = require('../models/member.model.js')

exports.findNumberOfMemberLoans = (req, res) => {
  Member.getNumberOfMemberLoans((err, data) => {
    if (err) {
      console.log('error: ', err)
    } else {
      console.log('data: ', data)
      res.send(data)
    }
  })
}
