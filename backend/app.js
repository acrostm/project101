var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
let infoRouter = require('./routes/info');
var weatherRouter = require('./routes/weather'); // 引入天气路由
var searchCityRouter = require('./routes/cityAutocomplete'); // 引入天气路由

var app = express();

// cors setup
const configureCors = require('./middlewares/cors'); // 引入自定义的CORS中间件
app.use(configureCors()); // 使用CORS中间件

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 添加中间件来处理代理服务器的IP地址
app.set('trust proxy', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/userInfo', infoRouter);
app.use('/weather', weatherRouter); // 使用天气路由
app.use('/searchCity', searchCityRouter);

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
