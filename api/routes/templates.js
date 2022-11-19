//Templates Page
var express = require('express');
var app = module.exports = express(); //export routes
const { Pool } = require('pg')

//connection to db
const { pool } = require('../database');

//table of contents




//return list of existing templates
app.get('/templates', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`select * from templates`)
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

//Create a new template and insert associated behaviors into bridge_templates_behaviors_classes
app.post('/new_template', (req, res) => {
	//unpack behaviors object
	var object = req.body.behaviors_object
	var list  = []
	object.forEach(e => list.push(e.behavior_class_id));
	pool
		.connect()
		.then(client => {
 			return client
				.query(`
with sample as (insert into templates (title, duration) values (\'${req.body.title}\',${req.body.duration}) returning id)
insert into bridge_templates_behaviors_classes
	(template_id, behavior_class_id) 
select sample.id, unnest(array[${list}])
from sample
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






























	
//return list of behaviors associated with a template - can use for edit button and create
app.get('/templates/:template_id', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`
select a.id, a.template_id, a.behavior_class_id, c.title, d.type, c.comment from bridge_templates_behaviors_classes a
join bridge_behaviors_classes b on a.behavior_class_id = b.id
join behaviors c on b.behavior_id = c.id
join classes d on b.class_id = d.id
where template_id = ${req.params.template_id}`)
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

//create new template - click new -> opens blank form -> submit adds new template
app.post('/template', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`insert into templates (title, comment) values (\'${req.body.title}\',\'${req.body.comment}\')`)
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

//adds a behavior to a template
app.post('/t_add_behavior', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`insert into bridge_templates_behaviors_classes (template_id, behavior_class_id) values (\'${req.body.template_id}\',\'${req.body.behavior_class_id}\')`)
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

//removes a behavior from template
app.delete('/t_remove_behavior/:bridge_template_id', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`delete from bridge_templates_behaviors_classes where id = ${req.params.bridge_template_id}`)
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



//update an existing template
app.put('/template', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`update templates set title = \'${req.body.title}\', comment = \'${req.body.comment}\' where id = ${req.body.template_id}`)
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

//delete template
app.delete('/template/:id', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`delete from templates where id = ${req.params.id}`)
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


 
