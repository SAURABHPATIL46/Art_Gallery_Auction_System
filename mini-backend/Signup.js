import mongoose ,{ Schema } from "mongoose";

const RegistrationSchema=new Schema({

    fname:String,
    lname:String,
    username:String,
    email:String,
    password:String,
    cpassword:String,
})

export const Registration=mongoose.model("RegistrationInfo",RegistrationSchema);
        