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
      type:mongoose.Schema.Types.ObjectId,
      ref:'Category'
    },
    // price:{
    //   type:Number
    // },
    variants: [
      {
        name:{type: String},
        price: {
          type: Number,
        },
        offer: {
          type: Number,
          min: 0,
          max: 100
        },  
        offerPrice: {type:Number}
      }
    ],
    stock: {
      type: Boolean,
      default: true
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