var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to Mongo DB
mongoose.connect('mongodb://localhost/distort-portal', {useNewUrlParser: true, useUnifiedTopology: true, 'useFindAndModify': false});
mongoose.set('useFindAndModify', false);

// Require our models
var student = require("./app/models/distortSession");

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// [CONFIG] Port for server is set here
var port = process.env.PORT || 8989;

// Routes start here
// ======================

// defining route for devices
const routes = require("./app/routes");

// Registering the api routes is done here
app.use('/', routes);

// Serve the files in the /views directory.
app.use(express.static('app/views'));

// ===========================================
// ROUTES ends here

// START SERVER HERE
// =============================

app.listen(port);
console.log("Server is currently running on port "+ port);
