/**
 * Module dependencies
 */
var express = require('express'),
  pages = require('./routes/index'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

/**
 * Configuration
 */
// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


/**
 * Routes
 */

// serve index and view partials
app.get('/', pages.index);
app.get('/partials/:name', pages.partials);

/* JSON API */
app.get('/api/rides', api.listRides);
app.post('/api/rides', api.newRide);
app.get('/api/rides/:id', api.getRide);
app.post('/api/rides/:id', api.addRider); // POST for a specific ride id to signup for a ride
app.get('/api/verify/:token', api.verify);
app.get('/api/feedback/:to', api.getFeedback);
app.post('/api/feedback', api.setFeedback);
app.post('/api/feedback/:to', api.setFeedback);

// redirect all others to the index (HTML5 history)
app.get('*', pages.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
