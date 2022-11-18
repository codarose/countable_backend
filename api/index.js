//import libraries
var express = require('express');
const cors = require('cors');
const { Pool } = require('pg')

//define connection to db
const { pool } = require('./database');

//import routes
var behaviors = require('./routes/behaviors');
var templates = require('./routes/templates');
var subjects = require('./routes/subjects');
var sessions = require('./routes/sessions');

var app = express();
const port = 3001;
app.use(express.json())
app.use(cors({origin: '*'}));


//use imported routes
app.get('/',(req, res) => res.send("initial route"));
app.use(behaviors);
app.use(templates);
app.use(subjects);
app.use(sessions);
 
		
		


//actively listen on port for calls
app.listen(port, () => {console.log(`Backend is running on ${port}`)});
