//
// Henkilötietojärjestelmä server
//

var http = require('http');
var path = require('path');

var express = require('express');
var routes = require('./routes')
  , people = require('./routes/people');

var app = express();

app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
// Use ejs as a view engine
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Middleware for 404
//app.use(function(req, res) {
// res.status(400);
//  res.render('404');
//});

// Database connection
var mongoose = require("mongoose");
// Local db
mongoose.connect('mongodb://' + process.env.IP + '/data');

var db = mongoose.connection;
db.once('open', function callback () {
  console.log("db connected");
});

// Routes
app.get('/', routes.index);

app.get('/people', people.list);
app.post('/people', people.add);
app.delete('/people', people.deleteAll);

app.get('/people/:id', people.getOneToEdit);
app.put('/people/:id', people.edit);
app.delete('/people/:id', people.deleteOne);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
