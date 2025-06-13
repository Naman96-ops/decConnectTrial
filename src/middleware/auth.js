const jwt = require('jsonwebtoken')
const Users = require('../model/users');

const userAuth = async(req,res,next) => {

    try{

        const {token} = req.cookies;

        if(!token){
            return res.status(401).send("Please Login!!")
        }

        const decodeObj = await jwt.verify(token,"DEV@Connect$790");
        console.log(decodeObj)
        
        const {_id} = decodeObj;

        const user = await Users.findById(_id);

        if(!user){
            throw new Error("User not found")
        }

        req.user = user;
        next();

    }
    catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
}

module.exports = userAuth;
