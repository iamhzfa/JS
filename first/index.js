var express = require('express');
require('./database/db.js')
require('dotenv').config()
const schema = require('./models/schema.js')
const path = require('path')
var app = express();
var port = 3000

app.get('/hiii', function(req, res){
    const location = path.join(path.resolve(), './index.html')
    res.sendFile(location)
})
app.listen(3000, function(){
    console.log(`Port is running on ${port}`)
})