const express = require('express')
const bcrypt = require('bcrypt')
const Users = require('../model/users')
const authRouter = express.Router();


authRouter.post("/signup",async(req,res) => {

try{

   //const{password} =req.body;

   const passwordHash = await bcrypt.hash(req.body.password,10)
   console.log(passwordHash)

     const user = new Users({
        ...req.body,password:passwordHash,
     })

   const savedUser = await user.save();

   const token = await savedUser.JWT()
              
   res.cookie("token",token)

   res.json({message:"User Added",data:savedUser})

}
catch(err){
    res.status(400).send("ERROR: "+err.message)
}

})

authRouter.post("/login",async(req,res) => {

    try{

        const {email,password}=req.body;

        const users = await Users.find({email:email})
        
        
        const user = users[0];
        

        if(!user){
            throw new Error("Invalid Credentials")
        }

        const isPasswordValid = await user.validatePassword(password)

        if(isPasswordValid){

            const token = await user.JWT()
              
            const cookie= res.cookie("token",token)
            
            console.log(req.cookies);




            res.send(user)
        }
        else{
            throw new Error("Invalid Credential")
        }


    }
    catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})

authRouter.post("/logout", async(req,res) => {

    res.cookie("token",null,{
        expires:new Date(Date.now())
    })

    res.send("logout Scuucessfully")
})

module.exports = authRouter;