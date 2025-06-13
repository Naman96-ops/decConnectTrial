const express = require('express')

const userAuth = require('../middleware/auth')
const {validateEditProfileData} =  require('../utils/validation')

const profileRouter = express.Router();


profileRouter.get("/profile",userAuth,async(req,res) => {
    const user = req.user;
    res.send(user)
})

profileRouter.patch("/profile/edit",userAuth, async(req,res)=>{

  try{
       if(!validateEditProfileData(req)){
        throw new Error("Invalid Edit Request")
       }

       const loggedInUser = req.user;

     

       Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key])

       await loggedInUser.save()


       res.send(`${loggedInUser.firstName} your profile updated successfully`)


  }
  catch(err){
    console.error("Edit profile error:", err);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }


})

module.exports = profileRouter