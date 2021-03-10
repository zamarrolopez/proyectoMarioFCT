/*
** Dependencias
*/
const express = require('express');
const morgan = require('morgan');
const normalizePort = require('normalize-port');
const path = require('path');
const createError = require('http-errors');
//
const app = express();

//Puerto normalizado
const PORT = normalizePort(process.env.PORT || '3000');


app.use(morgan('dev'));
app.use(express.json());
app.listen(PORT, () =>{
  console.log(`Servidor ejecutandosee en puerto ${PORT}.`);
});


/*
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
