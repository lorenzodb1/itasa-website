let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let i18n = require('i18n-express');
let partials = require('express-partials');
let compression = require('compression');
let indexRouter = require('./routes/index');

let app = express();

const letsEncryptReponse = process.env.CERTBOT_RESPONSE;

app.get('/.well-known/acme-challenge/:content', function(req, res) {
  res.send(letsEncryptReponse);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'),
  cookieLangName: 'lang-cookie',
  browserEnable: false,
  defaultLang: 'en',
  paramLangName: 'l',
  siteLangs: ['en', 'it'],
  textsVarName: 'translation'
}));

app.use(partials());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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

module.exports = app;
