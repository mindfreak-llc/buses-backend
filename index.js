
const express = require('express');
const mongoose = require('./dbconnect/dbconnect');
const cors = require("cors")
const usersCollection= require('./routers/users')
const busesCollection= require('./routers/buses')

const app = express();
app.use(express.json());


//------

app.use(cors())
app.use(usersCollection)
app.use(busesCollection)
//

 

app.listen(5642,function(){
    console.log("Server running at http://localhost:5642");
})

