const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/public/hii.html')
})

app.listen(port, ()=> {
    console.log(`Server run on ${port}`)
})