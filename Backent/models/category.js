import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    restaurent:{
        type :mongoose.Schema.Types.ObjectId,
        ref:'Restaurent',
    },
    is_deleted :{
        type : Boolean,
        default:false
    }
})

const Category = mongoose.model('category',categorySchema)

export default Category