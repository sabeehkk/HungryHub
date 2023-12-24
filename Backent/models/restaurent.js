import mongoose from "mongoose";

const restaurentSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  place: {
    type: String,
  },
  address: {
    type: String,
    trim: true,
  },
  profilePicture: {
    type: String,
    default: null,
  },
  status: {
    type: Boolean,
    default: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  ],
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  reviews: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      review: {
        type: String,
        maxlength: 500,
      },
    },
    { timestamps: true },
  ],
  rating: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0,
      },
    },
    { timestamps: true },
  ],
});

// module.exports  =restaurentSchema
const Restaurent = mongoose.model("Restaurant", restaurentSchema);

export default Restaurent;
