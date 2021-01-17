/**
 * The routes for member schema
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

module.exports = app => {
  const member = require('../controllers/member.controller')

  app.get('/members/all', member.findAllMembers)
  app.get('/members/loan-quantity', member.findNumberOfMemberLoans)
}
