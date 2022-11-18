//Subjects Page
var express = require('express');
var app = module.exports = express(); //export routes
const { Pool } = require('pg')

//connection to db
const { pool } = require('../database');

//table of contents
/*
Routes: Input is in JSON format using variables listed
endpoint, method, input, description
/subjects - GET - (NO INPUT) - return list of existing subjects
/subject -	POST - (first_name,last_name, comment) - create new subject
/subject -	PUT -  - (subject_id,first_name,last_name, comment) - modifies subject values
/subject/:subject_id - DELETE - (subject_id [in endpoint]) - deletes subject from existing list

/s_add_subject - POST - (session_id, subject_id) - adds a subject to a session
/s_remove_subject/:bridge_subject_id - DELETE - (bridge_template_id [in endpoint]) - removes subject from session



*/

//return list of existing subjects
app.get('/subjects', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`select id, first_name, last_name, comment from subjects`)
				.then(data => {
			        client.release()
			        res.send(data.rows)
			})
		.catch(err => {
		        client.release()
		        console.log(err.stack)
			})
  	})
});
	
//create new subject
app.post('/subject', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`insert into subjects (first_name,last_name, comment) values (\'${req.body.first_name}\',\'${req.body.last_name}\',\'${req.body.comment}\')`)
				.then(data => {
			        client.release()
			        res.send(data.rows)
			})
		.catch(err => {
		        client.release()
		        console.log(err.stack)
			})
  	})
});

//updates subject data based on id
app.put('/subject', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`update subjects set first_name = \'${req.body.first_name}\', last_name = \'${req.body.last_name}\', comment = \'${req.body.title}\' where id = ${req.body.subject_id}`)
				.then(data => {
			        client.release()
			        res.send(data.rows)
			})
		.catch(err => {
		        client.release()
		        console.log(err.stack)
			})
  	})
});

//deletes a subject based on its id
app.delete('/subject/:subject_id', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`delete from subjects where id = ${req.params.subject_id}`)
				.then(data => {
			        client.release()
			        res.send(data.rows)
			})
		.catch(err => {
		        client.release()
		        console.log(err.stack)
			})
  	})
});



//add a subject to a session
app.post('/s_add_subject', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`insert into bridge_sessions_subject (session_id, subject_id) values (${req.body.session_id},${req.body.subject_id})`)
				.then(data => {
			        client.release()
			        res.send(data.rows)
			})
		.catch(err => {
		        client.release()
		        console.log(err.stack)
			})
  	})
});

//delete subject from session
app.delete('/s_remove_subject/:bridge_subject_id', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`delete from bridge_sessions_subject where id = ${req.params.bridge_subject_id}`)
				.then(data => {
			        client.release()
			        res.send(data.rows)
			})
		.catch(err => {
		        client.release()
		        console.log(err.stack)
			})
  	})
});


 
