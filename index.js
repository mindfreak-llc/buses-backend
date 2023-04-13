
const express = require('express');
const mongoose = require('./dbconnect/dbconnect');
const cors = require("cors")
const usersCollection= require('./routers/users')
const busesCollection= require('./routers/buses')

const app = express();
app.use(express.json());

const port=4000
//------

app.use(cors())
app.use(usersCollection)
app.use(busesCollection)
//

 

app.listen(port,()=>{
    console.log("Server running at http://localhost:" +port);
})

