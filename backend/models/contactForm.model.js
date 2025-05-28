import mongoose from 'mongoose'

const contactFormSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        // Remove unique:true - same person might contact multiple times
    },
    subject:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Fix: Use contactFormSchema instead of userSchema
// export const Contact = mongoose.model("Contact", contactFormSchema);

// Or use default export (recommended)
const Contact = mongoose.model("Contact", contactFormSchema);
export default Contact;