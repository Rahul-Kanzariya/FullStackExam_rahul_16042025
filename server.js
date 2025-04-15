var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { mongoConnection } = require('./core/db')
var cors = require('cors');
const { normalizePort, onError } = require('./src/utilities/helper');
var app = express();
var http = require('http');
var authRouter = require('./src/routes/auth.route');
var productRouter = require('./src/routes/product.route');
var cartRouter = require('./src/routes/cart.route');
const authenticateToken = require('./core/auth.middleware');


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoConnection()


// Adding Routes
app.use('/auth', authRouter)
app.use(authenticateToken)
app.use('/product', productRouter)
app.use('/cart', cartRouter)

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
  res.send(err)
});

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
console.log('server listening on', port);