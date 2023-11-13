import mongoose from 'mongoose'


const restaurentSchema = new mongoose.Schema({
    restaurantName: {
        type :String,
        required:true,
    },
    email:{
        type : String,
        required:true 
    },
    phoneNumber:{
        type : Number,
    },
    password : {
        type :String,
        required :true ,
    },
    address :{
        type : String,
        trim : true ,
    },
    //  password : {
    //     type :String ,
    //     require : true
    //  },
     profilePicture : {
        type :String ,
        default : null
     },
     status:{
        type:Boolean,
        default:true,
    },
})

// module.exports  =restaurentSchema
const Restaurent = mongoose.model("Restaurent",restaurentSchema)

export default Restaurent