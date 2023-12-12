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
    place:{
        type:String
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
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
        }],
     product:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
          }],
  
})

// module.exports  =restaurentSchema
const Restaurent = mongoose.model("Restaurant",restaurentSchema)

export default Restaurent