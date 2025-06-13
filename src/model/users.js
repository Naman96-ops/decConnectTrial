const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        minLength:2,
        maxLength:50,
        required:true
    },
    lastName:{
        type:String,
        minLength:2,
        maxLength:50,
        required:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password")
            }
        }
    },
    age:{
        type:Number,
        min:18,
        max:80
    },
    gender:{
        type:String,
        lowercase:true,
        validate(value) {
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender not valid")
            }
        }
    },
    about:{
        type:String,
        default:"This is default behaviour",
       
       
    },
    photoURL:{
          type:String,
          default:"https://cdn-icons-png.flaticon.com/512/149/149071.png",

    },
    skills:{
        type:[String],
        validate(value){
            if(value.length>10){
                throw new Error("Skills cannot be more than 10")
            }
        }
    }

},{
    timestamps:true,
})

userSchema.methods.JWT = async function() {

    const user = this;

    const token = await jwt.sign({_id:user._id},"DEV@Connect$790",{expiresIn:"7d"})

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){

    const user = this;

    const passwordHash = user.password;

    const isPasswordValidate = await bcrypt.compare(passwordInputByUser,passwordHash)

    return isPasswordValidate
}

const Users = mongoose.model("Users",userSchema)

module.exports = Users;
