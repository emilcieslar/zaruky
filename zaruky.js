// set up =================================================
// get all the tools we need
var express = require('express')
var app = express()
var port = process.env.PORT || 3000
var passport = require('passport')
var flash = require('connect-flash')

var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
// load credentials
var credentials = require('./credentials-local.js')
//var credentials = require('./credentials.js')

// Log every request to console
app.use(morgan('dev'))

// set up cookies and sessions
app.use(cookieParser(credentials.cookieSecret))
app.use(session({ 
	secret: credentials.cookieSecret,
	resave: true,
	saveUninitialized: true 
}))

// set up handlebars view engine
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' })
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// passport set up
require('./config/passport')(passport) // passport configuration
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // flash messages stored in session

// set up middlewares

// set up static directory
app.use(express.static(__dirname + '/public'))
// set up parser for POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// routes =======================================================
// router for handling adding/editing/deleting
app.use(require('./controllers/func'))
// router for home
app.use(require('./controllers/home'))

// launch =======================================================
app.listen(port, function() {
	console.log( 'Express started on http://localhost:' + port + '; press Ctrl-C to terminate.' )
})