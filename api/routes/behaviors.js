//Behaviors Page
var express = require('express');
var app = module.exports = express(); //export routes
const { Pool } = require('pg')

//connection to db
const { pool } = require('../database');

//table of contents
/*
Routes: Input is in JSON format using variables listed
endpoint, method, tables, input, description
/classes -	GET - classes - (NO INPUT) - grab available classes to assign to new routes
/behaviors -	GET - behaviors, classes, bridge_behaviors_classes - (NO INPUT) - grab available classes to assign to new routes
/behavior -	POST - bridge_behaviors_classes - (behavior_id, class_id) - inserts new behavior and associated class to bridge_behaviors_classes
/behavior -	PUT - behaviors, bridge_behaviors_classes - (behavior_id, class_id, title, comment) - updates existing behavior and associated class to bridge_behaviors_classes and behaviors.
/behavior/id - DELETE - behaviors - (behavior_id [in endpoint]) - deletes behavior based on id and cascades to refrenced tables



*/

//grab available classes to assign to new behavior
app.get('/classes', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`select * from classes`)
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

//grab existing behaviors
app.get('/behaviors', (req, res) => {
	pool
		.connect()
		.then(client => {
 			return client
				.query(`
select a.id, a.behavior_id, a.class_id, b.title, c.type, b.comment from bridge_behaviors_classes a 
join behaviors b on a.behavior_id = b.id
join classes c on a.class_id = c.id`)
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

//inserts new behavior and associated class to bridge_behaviors_classes
app.post('/behavior', (req, res) => {
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
        returning id)
insert into bridge_behaviors_classes
        (behavior_id, class_id)
select id, ${req.body.class_id}
from test`)
        .then(data => {
              client.release()
              res.status(200)
      })
    .catch(err => {
            client.release()
            console.log(err.stack)
      })
    })
});
		
//updates behavior and associated class to bridge_behaviors_classes
app.put('/behavior', (req, res) => {
	pool
    .connect()
    .then(client => {
      return client
        .query(`
with test as (
  update behaviors
  set title = \'${req.body.title}\',
  comment = \'${req.body.comment}\'
  where id = ${req.body.behavior_id})
  update bridge_behaviors_classes
  set class_id = ${req.body.class_id}
  where behavior_id = ${req.body.behavior_id};
	`)
        .then(data => {
              client.release()
              res.status(200)
      })
    .catch(err => {
            client.release()
            console.log(err)
      })
    })
});


//deletes behavior based on id and cascades to refrenced tables
app.delete('/behavior/:id', (req, res) => {
	pool
    .connect()
    .then(client => {
      return client
        .query(`delete from behaviors where id = ${req.params.id}`)
        .then(data => {
              client.release()
              res.status(200)
      })
    .catch(err => {
            client.release()
            console.log(err.stack)
      })
    })
});


 
