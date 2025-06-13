const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({

  fromUserId : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users", //reference to the Users collection
    required:true
  },
  
  toUserId : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users",
    required:true
  },

  status : {
    type:String,
    enum:{
        values:["ignored","intrested","accepted","rejected"],
        message:`{VALUE} is incorrect status type`,
    }
  }
 

},
{
    timestamps:true
})

connectionRequestSchema.index({fromUserId:1 , toUserId:1})

connectionRequestSchema.pre('save', function(next){

    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot sent connection request to yourself")
    }
    next();
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel",connectionRequestSchema)

module.exports = ConnectionRequestModel;