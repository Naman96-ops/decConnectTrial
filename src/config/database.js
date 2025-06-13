const mongoose = require('mongoose')


const connectDB = async() => {

  await mongoose.connect("mongodb+srv://namanjoshi96:ERxybg05lKpqVlY5@cluster0.c0gauvt.mongodb.net/devConnectTrial")

}



module.exports = connectDB;




