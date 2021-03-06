
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , chat = require('./chat');

var app = express();

// all environments
app.set('port', 3010);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// app.use(function(req, res, next){
//   if (req.header['authorization'] != process.env.GB_DEPLOY_ALERT_AUTH)
//     return req.status(401).json({ name: "NOT_AUTHENTICATED" });

//   next();
// });

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var deployments = [];

app.post('/deployments', function(req, res){
  deployments.push(req.body.app);
  res.status(204).end();
});

app.post('/deployments/:app', function(req, res){  
  if (req.param('app') === 'accepted') {
    var order = req.body;
    // Send hipchat notification
    chat.send({
      room_id: 'Cater',
      message: chat.createOrderMessage(order)
    });
  }

  deployments.push(req.param('app'));
  res.status(204).end();
});

app.get('/deployments', function(req, res){
  res.json({ app: deployments.pop() });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
