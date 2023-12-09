import OrderModel from "../../models/order.js";
import CartModel from "../../models/cart.js";
import UserModel from "../../models/user.js";
import ProductModel from "../../models/product.js";
import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIP_PRIVET_KEY);

export const Order = async (req, res) => {
  try {
    console.log(req.body, "inside order backend");
    const { payment, addressIndex, cartData } = req.body;
    const user = await UserModel.findOne({ _id: cartData.user });
    console.log("user ", user);
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
    } else if (payment === "Online") {
      // console.log(req.body,'inside online state');
      const data = req.body;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: "Food Ordering",
              },
              unit_amount: cartData?.total * 100,
            },
            quantity: 1,
          },
        ],

        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/payment-success/${cartData?.user}`,
        cancel_url: `${process.env.CLIENT_URL}/payment-fail`,
      });
      console.log(session, "stripe is working");

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

      return res.json({ message: "success", url: session.url });
    }else if (payment === "Wallet") {
      console.log('inside wallet')
      if (user.Wallet >= cart.grandTotal) {
        const grandTotal = parseFloat(cart.grandTotal).toFixed(2);
        await UserModel.updateOne(
          { _id: cartData.user },
          {
            $inc: {
              Wallet: -grandTotal,
            },
          }
        );
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
        res.status(200).json({
          success: true,
          message: "order success",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Insufficiant Balnce",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: true });
  }
};

export const getOrderItems = async (req, res) => {
  try {
    console.log("inside getOrder iTEMS");
    console.log(req.query);
    const { id } = req.query;
    const orderItems = await OrderModel.findOne({ _id: id })
      .sort({ _id: -1 })
      .populate("item.product")
      .populate("employeeId");
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
};

