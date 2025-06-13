const express = require('express');
const userAuth = require('../middleware/auth');
const ConnectionRequestModel = require('../model/connectionRequest');
const Users = require('../model/users');

const userRouter = express.Router();

userRouter.get("/user/requests/received",userAuth, async(req,res) => {

    try{
     
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequestModel.find({
            toUserId:loggedInUser._id,
            status:"intrested"
        }).populate("fromUserId","firstName lastName age gender about");



        res.json({message:"Data fetched Successfully",data:connectionRequest})

    }
    catch(err){
      res.status(400).send("ERROR: "+err.message)
    }
})

userRouter.get("/user/connections",userAuth, async(req,res) => {

   try{

    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequestModel.find({
        $or:[
            {toUserId:loggedInUser._id,status:"accepted"},
            {fromUserId:loggedInUser._id,status:"accepted"}
        ]
    }).populate("fromUserId","firstName lastName age gender about")
    .populate("toUserId","firstName lastName age gender about")

    const data = connectionRequest.map((row)=>{
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId;
        }
        else{
            return row.fromUserId;
        }
    });

    res.json({data})

   }
   catch(err){
    res.status(400).send("ERROR: "+err.message)
   }

})

userRouter.get("/user/feed",userAuth,async(req,res) => {

    try{

        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        limit = limit > 50 ? 50 : limit;

        const skip = (page - 1)*limit;

        const connectionRequests = await ConnectionRequestModel.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId")

        
        const hideUsersFromFeed = new Set();

        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })

        const users = await Users.find({
            $and :[
                {_id:{$nin:Array.from(hideUsersFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select("firstName lastName age gender about").skip(skip).limit(limit)

        res.send(users)


    }
    catch(err){
        res.status(400).send("ERROR: "+ err.message)
    }
})

module.exports = userRouter;
