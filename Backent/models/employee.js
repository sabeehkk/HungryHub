import mongoose from 'mongoose'


const employeeSchema = new mongoose.Schema({
    name:{
        type : String,
     },
    email:{
        type: String,
        required:true,
     },
    phoneNumber : {
        type:Number,
     },
    password : {
        type :String,
        required:true,
     },
    address : {
        type:Boolean,
        default:true,
     },
    status:{
        type:Boolean,
        default:true,
     },
    createdAt :{
        type:Date,
        default:Date.now,
     },
     ernings:{
        type:Number,
        default:0
      },
      rating:{
        type:Number
      },
    
})
const Employee = mongoose.model('employee',employeeSchema)

export default Employee