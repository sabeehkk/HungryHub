import OrderModel from "../../models/order.js";
import CartModel from '../../models/cart.js'
import UserModel from '../../models/user.js'
import ProductModel from '../../models/product.js'
import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIP_PRIVET_KEY);


export const Order = async (req, res) => {
  try {
    console.log(req.body,'inside order backend');
    const { payment, addressIndex, cartData } = req.body;
    const user = await UserModel.findOne({ _id: cartData.user });
    const address = user.Address[addressIndex];
    const cart = await CartModel.findOne({ _id: cartData._id }).populate(
      "items.productId"
    );
    const items = cart.items.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
      price: item.price,
      variant: item.variant,
    }));
    const paymentStatus = payment === "COD" ? "Pending" : "Paid";
    if (payment === "COD") {
      await OrderModel.create({
        userId: user._id,
        restaurantId: cart.restaurantId,
        item: items,
        totalPrice: cart.total,
        discount: cart.discount,
        grandTotal: cart.grandTotal,
        address,
        paymentType: payment,
        paymentStatus,
      });
      await CartModel.deleteOne({ _id: cartData._id });
      res.status(200).send({
        success: true,
        message: "order success",
      });
    } else if (payment === 'Online') {
        
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "server error",
    });
  }
};

export const getOrderItems = async (req,res)=>{
  try {
    console.log('inside getOrder iTEMS');
    console.log(req.query);
    const { id } = req.query;
    const orderItems = await OrderModel.findOne({ _id: id })
      .sort({ _id: -1 })
      .populate("item.product").populate("employeeId")
    res.status(200).send({
      success: true,
      orderItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error.",
    });
  }
}
