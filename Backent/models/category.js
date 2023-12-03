import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    restaurent:{
        type :mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
    },
    is_deleted :{
        type : Boolean,
        default:false
    }
})

const Category = mongoose.model('Category',categorySchema)

export default Category