var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
if (process.env.NODE_ENV !== 'production') {
  process.env.POSTGRES_PORT = 5432;
  process.env.POSTGRES_HOST = 'app-db';
  process.env.POSTGRES_DATABASE = 'app';
  process.env.POSTGRES_PASSWORD = '';
  process.env.POSTGRES_USERNAME = 'postgres';
  process.env.APP_LISTEN_PORT = '80';
}
var app = express();

// view engine setup
var indexRouter = require('./routes/index');
var appRouter = require('./routes/app');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', indexRouter);
app.use('/app', appRouter);

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

console.log("ENV", process.env.NODE_ENV);
app.listen(process.env.APP_LISTEN_PORT, () => {
  console.log('Server started on port ' + process.env.APP_LISTEN_PORT);
})
module.exports = app;
