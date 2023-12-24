import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        // ref: "Restarant",
        ref: "Restaurant",
      },
      item: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
          },
          price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
            required: true,
          },
          variant:{
            type: String
          },
          orderStatus: {
            type:String,
            default:"Pending"
          },
          is_canceled:{
            type: Boolean,
            default: false
          }
        },
      ],
      start_date: {
        type: Date,
        default:Date.now()
      },
      delivered_date: {
        type: Date,
      },
      totalPrice: {
        type: String,
      },
      discount: {
        type:Number,
    },
      grandTotal: {
      type:Number
    },
    address: {
        type: Array,
      },
      paymentType: {
        type: String,
      },
      paymentStatus: {
        type:String
    },
    employeeId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
},{
    timestamps: true
  });
  

const Orders = mongoose.model('orders',orderSchema)

export default Orders