var express = require('express');
var app = module.exports = express();

//import common
const { grabList, moveItem } = require('../common/moveItem');
const { pool } = require('../database');

//return behaviors list
app.get("/list_behaviors", async (request, response) => {
	grabList(pool, "behaviors")
		.catch(e => {
			console.error(e.stack)
			response.send(e.stack)
			})
		.then(a => {
			console.log(a)
			response.setHeader('Content-Type','application/json')
			response.json(a)
			})

	});


//remove from full list and add to favorites
app.put("/list_behaviors", async (request, response) => {
	moveItem(pool, "list_full","list_favorites",request.params.id)
		.catch(e => {
			console.error(e.stack)
			response.send(e.stack)
			})
		.then(a => {
			console.log(a)
			response.send(a)
			})
	});

//remove from full list and add to deleted
app.get("/api/list_full/to_deleted/:id", async (request, response) => {
	moveItem(pool, "list_full","list_deleted",request.params.id)
		.catch(e => {
			console.error(e.stack)
			response.send(e.stack)
			})
		.then(a => {
			console.log(a)
			response.send(a)
			})
	});
