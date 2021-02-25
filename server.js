'use strict';
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const db=require("./mysql_connection/connection.js");
var mysql=require('mysql');

var app = express();
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.set('port', process.env.PORT || 3001);

// Express only serves static assets in production
console.log('NODE_ENV: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  // Return the main index.html, so react-router render the route in the client
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/build', 'index.html'));
  });
}


//config db ====================================
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123',
  database:'mysql',
  port: 3306
});

const COLUMNS = ['Symbol', 'Company name','created-date','updated-date'];

app.get('/api/:stockName', (req, res) => {
  const stockName = req.query.stockName;
  // var json  = req.params;
  // var stockName = json["stockName"];
  if (!stockName) {
    res.json({
      error: 'Missing error'
    });
    return;
  }
  

  var queryString = `SELECT * from stocks where symbol like '${stockName}%'`;
  pool.query(queryString, function(err, rows, fields) {
    if (err) throw err;
    else{
      JSON.stringify(rows)
      res.json({stocks:rows})
    }
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
