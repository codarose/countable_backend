//import libraries
const { Pool } = require('pg');

//Define and export DB Connection parameters 
module.exports = {
	pool: new Pool ({
	  user: 'python',
	  host: 'localhost',
	  database: 'python',
	  password:  'python',
	  port: 5432,
		}),
}
