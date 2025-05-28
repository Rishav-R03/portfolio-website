import mongoose from 'mongoose'

const contactFormSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    message:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
});

export const Contact = mongoose.model("Contact",userSchema);
