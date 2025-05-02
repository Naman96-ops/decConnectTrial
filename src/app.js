const express = require('express')

const app = express();

app.use("/",(req,res) =>{
    res.send("Main server")
})

app.use("hello",(req,res) =>{
    res.send("Hello from the server")
})

app.use("test",(req,res) =>{
    res.send("test")
})




app.listen(7777,()=>{
    console.log("Server is successfully listining on port 7777")
})