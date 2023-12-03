import OrderModel from "../../models/order.js";
import CartModel from '../../models/cart.js'
import UserModel from '../../models/user.js'

export const Order = async (req, res) => {
  try {
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
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "server error",
    });
  }
};
