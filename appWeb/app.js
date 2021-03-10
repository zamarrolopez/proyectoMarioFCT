//Dependencias.
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const normalizePort = require('normalize-port');
//const dbConfig = require('./config/database.config');

//Sin usar.
const cors = require('cors');
const path = require('path');
const createError = require('http-errors');
const mongoose = require('mongoose');
//

const app = express();

//Puerto normalizado
const PORT = normalizePort(process.env.PORT || '3000');

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.listen(PORT, () =>{
  console.log(`Servidor ejecutandosee en puerto ${PORT}.`);
});


/*
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

*/
