import mongoose, { mongo } from 'mongoose'

 const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      restaurantId: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Restarant",
        },
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
          },
          variant: {
            type: String,
          },
          quantity: {
            type: Number,
            default: 1,
          },
    
          price: {
            type: Number,
          },
          date: {
            type: Date,
            defualt: Date.now(),
          },
        },
      ],
      total: {
        type: Number,
        default: 0,
      },
      discount: {
        type: Number,
        default: 0,
      },
      grandTotal: {
        type: Number,
        default: 0,
      },
    });

const Cart = mongoose.model('Cart',cartSchema)
export default Cart