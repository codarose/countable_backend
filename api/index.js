//import libraries
const express = require('express');
const cors = require('cors');

//import routes
//var full = require('./routes/example');


const port = 3001;
const app = express();

app.use(cors({origin: '*'}));


// use imported routes routes
//app.use(full);
app.get('/',(req, res) => res.send("initial route"));




//actively listen on port for calls
app.listen(port, () => {console.log(`Backend is running on ${port}`)});
