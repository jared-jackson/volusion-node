var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

var app = express();

var http = require('http').Server(app);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/public", express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    var normalized_path = path.normalize(__dirname + '/public/index.html');
    res.sendFile(normalized_path);
});

http.listen(3000, function() {
    console.log('HTTP service started.');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});

process.on('uncaughtException', function (err) {
    console.log(err); //TODO You typically log something with logstash orsomething of the sort
});

module.exports = app;
