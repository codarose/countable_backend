//import libraries
const { Pool } = require('pg');

//Define and export DB Connection parameters 
module.exports = {
	pool: new Pool ({
	  user: 'postgres',
	  host: 'localhost',
	  password: 'password',
	  database: 'countability',
	  port: 5432,
		}),
}
