import mongoose from "mongoose";

//Creating Schema for a new User
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    lname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:[true,"E-mail is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Password is required"],
    },
    phone:{
        type:String,
        required:true
    },
},{timestamps:true})

export default mongoose.model('Register_Users',userSchema);
