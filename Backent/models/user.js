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
      Address: [{
        street: {type:String},
        city: {type:String},
        state: {type:String},
        postalCode: {type:String},
        }],
   
      status: {
        type: Boolean,
        default: true,
      },
      Wallet:{
        type:Number,
        default:0
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})
const User = mongoose.model("User", userSchema);

export default User;
