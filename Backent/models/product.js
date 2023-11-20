import mongoose, { mongo } from 'mongoose'


const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    restaurent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurent',
    },
    descripttion: {
      type: String,
      required: true,
    },
    category:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Category'
    },
    price:{
      type:Number
    },
    images:{
      type: String,
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
  });

  const Product =mongoose.model('product',productSchema)

  export default Product