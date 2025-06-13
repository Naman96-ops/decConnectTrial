const express = require('express');
const connectDB = require('./config/database')
const cookieParser = require('cookie-parser')
const cors = require('cors')



const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');


const app = express();




// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true,
//      methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"]
// }));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204
}));

app.use(express.json())

app.use(cookieParser())




app.use("/",authRouter);
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)


connectDB()
.then(()=>{
    console.log("DataBase connected successfully")
    app.listen(7777,()=>{
    console.log("Server is successfully connected on 7777")
})
})
.catch((err)=>{
    console.log("DataBase Failed to connect")
})





