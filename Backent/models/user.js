import mongoose from 'mongoose'

const userSchema =new mongoose.Schema({
      name: {
        type: String,
        required: true,
        
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
       
      },
      password: {
        type: String,
        require: true,
      },
      profilePicture: {
        type: String,
        default:null
      },
      place:{
        type:String,
      },
      longitude:{
        type:Number
      },
       latitude:{
        type:Number
      },
      address: {
        type: String,
        trim: true,
        require: true,
      },
   
      status: {
        type: Boolean,
        default: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})
const User = mongoose.model("User", userSchema);

export default User;
