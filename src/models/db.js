/**
 * The connection to the mysql database.
 *
 * @author Denise Vestman
 * @version 1.0.0
 */

'use strict'

const mysql = require('mysql')
const dbConfig = require('../config/db.config.js')

// Setup MySql database
const con = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
  database: dbConfig.DB,
  multipleStatements: true
})

con.connect((err) => {
  if (err) {
    console.log('Something went wrong when trying to connect')
    console.log('error', err)
  } else {
    console.log('MySql successfully connected')

    const query = getInitialDatabaseAndTablesQuery()

    con.query(query, (err) => {
      if (err) throw err
      console.log('Database and tables created')
    })

    saveFileData('book', './src/models/data/book.csv')
    saveFileData('library', './src/models/data/library.csv')
    saveFileData('member', './src/models/data/member.csv')
    saveFileData('rating', './src/models/data/rating.csv')
  }
})

// Create database and tables
function getInitialDatabaseAndTablesQuery () {
  const query = `
  CREATE DATABASE IF NOT EXISTS ${dbConfig.DB};

  CREATE TABLE IF NOT EXISTS book(
    id VARCHAR(10) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    isbn VARCHAR(13) NOT NULL,
    author VARCHAR(50) NOT NULL,
    publishing_year VARCHAR(4) NOT NULL,
    publisher VARCHAR(50) NOT NULL,
    genre VARCHAR(30) NOT NULL,
    description VARCHAR(300) NOT NULL,
    availability BOOL NOT NULL, 
    loan_period VARCHAR(8) NOT NULL,
    member_id VARCHAR(5) DEFAULT '-',
    library_id VARCHAR(3) NOT NULL,
    FOREIGN KEY(member_id) REFERENCES member(id),
    FOREIGN KEY(library_id) REFERENCES library(id)
    );
    
  CREATE TABLE IF NOT EXISTS library (
    id VARCHAR(3) PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    city VARCHAR (25) NOT NULL
    );

  CREATE TABLE IF NOT EXISTS member (
    id VARCHAR(5) PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    city VARCHAR (25) NOT NULL,
    startdate DATE NOT NULL
    );

  CREATE TABLE IF NOT EXISTS rating (
    id VARCHAR(5) PRIMARY KEY,
    score VARCHAR(4) NOT NULL,
    review VARCHAR(300) DEFAULT 'No review was written.',
    isbn VARCHAR(13) NOT NULL,
    member_id VARCHAR(5) NOT NULL,
    FOREIGN KEY(member_id) REFERENCES member(id)
    );

  SET GLOBAL local_infile=TRUE;
  `

  return query
}

// Save file date to database tables
function saveFileData (tableName, filePath) {
  const sql = `
  SET FOREIGN_KEY_CHECKS=0;

  LOAD DATA LOCAL INFILE '${filePath}'
  IGNORE INTO TABLE library.${tableName}
  COLUMNS TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES;
  `

  con.query(sql, function (err, result) {
    if (err) {
      throw err
    } else {
      if (result.affectedRows > 0) {
        console.log('Number of records inserted: ' + result.affectedRows)
      }
    }
  })
}

module.exports = con
