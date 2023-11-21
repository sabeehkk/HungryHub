import mongoose, { mongo } from 'mongoose'


const productSchema = new mongoose.Schema({

  productName: {
      type: String,
      // required: true,
     },
    restaurent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurent',
    },
    description: {
      type: String,
      required: true,
    },
    category:{
      // type:mongoose.Schema.Types.ObjectId,
      type:String,
      ref:'Category'
    },
    price:{
      type:Number
    },
    images: [{
      type: String
    }],

    isDeleted:{
      type:Boolean,
      default:false
    }
  });

  const Product =mongoose.model('product',productSchema)

  export default Product