import OrderModel from "../../models/order.js";
import CartModel from "../../models/cart.js";
import UserModel from "../../models/user.js";
import ProductModel from "../../models/product.js";
import RestaurantModel from "../../models/restaurent.js";
import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIP_PRIVET_KEY);

//Order--------------------------------
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
    } else if (payment === "Online") {
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
// getOrderItems--------------------------------
export const getOrderItems = async (req, res) => {
  try {
    const { id } = req.query;
    const orderItems = await OrderModel.findOne({ _id: id })
      .sort({ _id: -1 })
      .populate("item.product")
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
// getOrders--------------------------
export const  getOrders= async (req, res) => {
  try {
    const id = req.query.id;
    const orders = await OrderModel.find({ userId: id })
      .sort({ _id: -1 })
      .populate("item.product");
    if (orders) {
      res.status(200).send({
        success: true,
        orders,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "You don't have any order",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "server error",
    });
  }
}
// cancelOrder------------------------
export const cancelOrder= async (req, res) => {
  try {
    const { itemId, orderId, userId } = req.body;
    const orderItem = await OrderModel.findOne({ "item._id": itemId });
    if (orderItem) {
      const canceledItemIndex = orderItem.item.findIndex(item => item._id.toString() === itemId);
      if (canceledItemIndex !== -1 && orderItem.item[canceledItemIndex].orderStatus !== "Delivered") {
        const canceledItem = orderItem.item[canceledItemIndex];
        const canceledProductPrice = canceledItem.price * canceledItem.quantity;
        const canceledProductDiscount = canceledProductPrice * (canceledItem.discount || 0);
        const updatedTotalPrice = orderItem.totalPrice - canceledProductPrice;
        const updatedDiscount = orderItem.discount - canceledProductDiscount;
        const updatedGrandTotal = updatedTotalPrice - updatedDiscount;
        if(req.baseUrl.startsWith('/restaurant')){
          await OrderModel.updateOne(
            { _id: orderId },
            {
              $set: {
                "item.$[element].is_canceled": true,
                totalPrice: updatedTotalPrice,
                discount: updatedDiscount,
                grandTotal: updatedGrandTotal,
              },
            },
            {
              arrayFilters: [{ "element._id": itemId }], 
            }
          );
        }else{
          await OrderModel.updateOne(
            { _id: orderId },
            {
              $pull: { item: { _id: itemId }, },
              $set: {
                totalPrice: updatedTotalPrice,
                discount: updatedDiscount,
                grandTotal: updatedGrandTotal
              },
            }
          );
        }
        res.status(200).send({
          success: true,
          message: "Item cancelled",
        });
        if (orderItem.paymentType !== "COD") {
          console.log('!COD order item cancelled');
          const formattedPrice = parseFloat(canceledProductPrice).toFixed(2);
          console.log(formattedPrice,userId,'formatted price')
          await UserModel.updateOne(
            { _id: userId },
            {
              $inc: { Wallet: parseFloat(formattedPrice) }
            }
          );
        }
      } else {
        res.status(400).send({
          success: false,
          message: "Item not found or cannot be cancelled.",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Order not found.",
      });
    }
  } catch (error) {
    console.error("Error cancelling item:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
}
// doRating---------------------------
export const  doRating= async (req,res) => {
  try {
    const { userId, rating, restId } = req.body;
    const existingRating = await RestaurantModel.findOne({
      "rating.userId": userId,
      _id: restId,
    });
    if (existingRating) {
      res.status(400).send({
        success: false,
        message: "You have already rating this restaurant...",
      });
    } else {
      await RestaurantModel.updateOne(
        { _id: restId },
        { $push: { rating: { userId, rating } } }
      );
      res.status(200).send({
        success: true,
        message: "Thank you! Rating submitted successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error.",
    });
   }
}
// doReview--------------------------------
export const doReview= async (req, res) => {
  try {
    const { userId, review, restId } = req.body;
    const existingReview = await RestaurantModel.findOne({
      "reviews.userId": userId,
      _id: restId,
    });
    if (existingReview) {
      res.status(400).send({
        success: false,
        message: "You have already review this restaurant...",
      });
    } else {
      await RestaurantModel.updateOne(
        { _id: restId },
        { $push: { reviews: { userId, review } } }
      );
      res.status(200).send({
        success: true,
        message: "Thank you! Review submitted successfully.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error.",
    });
  }
}