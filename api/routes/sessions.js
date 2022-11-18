//Sessions Page
var express = require('express');
var app = module.exports = express(); //export routes
const { Pool } = require('pg')

//connection to db
const { pool } = require('../database');

//table of contents
/*
Routes: Input is in JSON format using variables listed
endpoint, method, input, description
/sessions - GET - (NO INPUT) - return list of existing sessions
/session -	POST - (title, environment, comment) - create new session
/session -	PUT -  - (session_id, title, environment, comment) - modifies session values
/session/:session_id - DELETE - (session_id [in endpoint]) - deletes session from existing list

/s_view_sessions_subjects - GET - ( no input ) - view a full list of sessions each subject 
/s_view_sessions_subjects - GET - (session_id) - view a specific session/subject pair based on session_id
/s_create_subject - POST (session_id, first_name, last_name, comment) - creates new subject and adds subject to session
/s_add_subject - POST - (session_id, subject_id) - adds a subject to a session
/subject - PUT - (session_id, subject_id) - update subject values
/s_remove_subject/:bridge_subject_id - DELETE - (bridge_template_id [in endpoint]) - removes subject from session

//session specifig routes for behaviors
/s_behavior_list - GET - (session_id) - provides a list of behaviors assigned to session_id

/s_create_behavior - POST - (session_id, title, comment, class_id) - creates a new behavior and adds it to the session

/s_import_behavior - POST - (session_id,template_id) - imports the behaviors from a template

/s_add_behavior - (POST) - (session_id, bridge_behaviors_classes_id) - add from master behavior list to session

/s_remove_behavior/:bridge_behavior_sessions_classes_id - DELETE - (bridge_session_behavior_class_id) - removes the behavior from the session

/s_save_behavior - PUT - for every behavior in session when you hit save it will write/update values to bridge_session_behavior_class table.



*/

//return list of existing sessions
app.get('/sessions', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`select id, title, environment, comment from sessions`)
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
	
//create new session
app.post('/session', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`insert into sessions (title, environment, comment) values (\'${req.body.title}\',\'${req.body.environment}\',\'${req.body.comment}\')`)
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

//updates session data based on id
app.put('/session', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`update sessions set title = \'${req.body.title}\', environment = \'${req.body.environment}\', comment = \'${req.body.comment}\' where id = ${req.body.session_id}`)
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

//deletes a session based on its id
app.delete('/session/:session_id', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`delete from sessions where id = ${req.params.session_id}`)
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



//returns list of sessions and their subject
app.get('/s_view_sessions_subjects', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`
select a.id, a.session_id, a.subject_id, c.title, c.environment, c.comment, b.first_name, b.last_name, b.comment from bridge_sessions_subject a
join subjects b on a.subject_id = b.id
join sessions c on a.session_id = c.id
`)
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


//returns list of session and it's subject 
app.get('/s_view_session_subject/:session_id', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`
select a.id, a.session_id, a.subject_id, c.title, c.environment, c.comment, b.first_name, b.last_name, b.comment from bridge_sessions_subject a
join subjects b on a.subject_id = b.id
join sessions c on a.session_id = c.id
where session_id = ${req.params.session_id}
`)
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

//creates new subject and adds the subject to a session
app.post('/s_create_subject', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`
with test as (
        insert into subjects
                (first_name, last_name, comment)
        values
                (\'${req.body.first_name}\',\'${req.body.last_name}\',\'${req.body.comment}\')
        returning id)
insert into bridge_sessions_subject
        (subject_id, session_id)
select id, ${req.body.session_id}
from test`)
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

//return behaviors assigned to a specific session
app.get('/s_session_behavior_list', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`
select a.id, a.session_id, b.behavior_id, b.class_id, c.title, d.type, c.comment, a.count, a.start_time, a.stop_time from bridge_sessions_behaviors_classes a
join bridge_behaviors_classes b on a.behavior_class_id = b.id
join behaviors c on b.behavior_id = c.id
join classes d on b.class_id = d.id
where a.session_id = ${req.body.session_id}
`)
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

//create new behavior and assign to session
app.post('/s_create_behavior', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`
with test as (
        insert into behaviors
                (title, comment)
        values
                (\'${req.body.title}\',\'${req.body.comment}\')
        returning id),
test1 as (
insert into bridge_behavior_classes
        (behavior_id, class_id)
select id, ${req.body.class_id}
from test
	returning id)
insert into bridge_session_behaviors_classes
	(session_id, behavior_class_id)
select ${req.body.session_id}, id
from test1
`)
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


//add behavior from master list and assign to session
app.post('/s_add_behavior', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`
with test as (
  DO $$
  DECLARE
  city_names varchar
  BEGIN
  for item in select behavior_class_id
    from bridge_behaviors_classes
    where id=${req.body.bridge_behaviors_classes_id}
    LOOP
      insert into bridge_sessions_behaviors_classes
        (session_id, behavior_class_id)
      values (${req.body.session_id}, item)
    END LOOP
  END$$
  returning id)

`)
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


//import behaviors from templats list to session
app.post('/s_import_behavior', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`
with test as (
  DO $$
  DECLARE
  city_names varchar
  BEGIN
  for item in select behavior_class_id
    from bridge_template_behaviors_classes
    where id=${req.body.bridge_template_behaviors_classes_id}
    LOOP
      insert into bridge_sessions_behaviors_classes
        (session_id, behavior_class_id)
      values (${req.body.session_id}, item)
    END LOOP
  END$$
  returning id)
`)
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


//remove behaviors from session
app.delete('/s_remove_behavior/:bridge_behavior_sessions_classes_id}', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`
delete from bridge_session_id where id = ${req.params.bridge_behavior_sessions_classes_id}
`)
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

//save a sessions behaviors values to bridge_session_behavior_class - save button on form
app.post('/s_save_behavior', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`
with test as (
  DO $$
  DECLARE
  behavior varchar
  BEGIN
  for behaviors in select behavior_class_id
    from bridge_template_behaviors_classes
    where id=${req.body.bridge_template_behaviors_classes_id}
    LOOP
      insert into bridge_sessions_behaviors_classes
        (session_id, behavior_class_id, count, start_time, stop_time)
      values (${req.body.session_id}, behavior, ${req.body.count},${req.body.start_time},${req.body.stop_time},)
    END LOOP
  END$$
  returning id)
`)
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


 
