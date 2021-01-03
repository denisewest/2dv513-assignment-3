/**
 * The configuration to the mysql database.
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB
}
