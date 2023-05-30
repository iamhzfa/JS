const {Client} = require('pg')

require('dotenv').config()

const client = new Client({
    user: process.env.PG_USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
})
client.connect((err)=>{
    if (err) throw err;
    console.log("Connection successfull")
})