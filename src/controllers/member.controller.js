/**
 * The controller for member schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const Member = require('../models/member.model')

exports.findAllMembers = (req, res) => {
  Member.getAllMembers((err, data) => {
    if (err) {
      console.log('error: ', err)
    } else {
      res.render('layouts/members', { data })
    }
  })
}

exports.findNumberOfMemberLoans = (req, res) => {
  Member.getNumberOfMemberLoans((err, data) => {
    if (err) {
      console.log('error: ', err)
    } else {
      res.send(data)
    }
  })
}
