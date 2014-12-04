var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


//*****routes*****//
// var routes = require('./routes/index');
// var mentorRoute = require('./routes/mentor');

// app.use('/', studentRoute);
// app.use('/mentor', mentorRoute);
// app.engine('html');


app.use('/', express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + 'public');

// app.set('view engine', html)
// app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.get('/', function(req, res, next){
//     res.render('./mentor.html');
// });


app.listen(3000);

console.log('Server started: http://localhost:3000/');
