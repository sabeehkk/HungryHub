import mongoose from "mongoose";

import OrderModel from '../../models/order.js'
import ProductModel from '../../models/product.js';
import UserModel from '../../models/user.js';
import RestaurentModel from '../../models/restaurent.js';


export const viewOrders = async (req,res)=>{
    try {
        console.log(req.query,'inside view order');
        const id = req.query.id;
        const orders = await OrderModel.find({
          "item.product": {
            $in: await ProductModel.find({ restaurent_id: id }).select("_id"),
          },
        }).sort({ _id: -1 }).populate({
          path: "item.product",
          model: "product",
          match: { restaurant_id: id },
        });
        console.log(orders,'ordersdatas');
  
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
        console.log(error);
        res.status(500).send({
          success: false,
          message: "server error",
        });
      }
}

export const updateDeliveryStatus = async (req,res)=>{
    try {
        const { prodId, orderId, orderStatus } = req.body;
        console.log(req.body);
        let item_orderStatus;
        if (orderStatus === "Pending") {
          item_orderStatus = "Preparing...";
        } else if (orderStatus === "Preparing...") {
          item_orderStatus = "Packed";
        } else if (orderStatus === "Packed") {
          item_orderStatus = "Out of delivery";
        } else {
          item_orderStatus = "Delivered";
        }
        await OrderModel.updateOne(
          { _id:orderId, "item._id": prodId },
          {
            $set: {
              "item.$.orderStatus": item_orderStatus,
            },
          }
        );
        const order = await OrderModel.findOne({ _id:orderId });
        const allItemsDelivered = order.item.every(
          (item) => item.orderStatus === "Delivered"
        );
        if (allItemsDelivered) {
          await OrderModel.updateOne(
            { _id:orderId },
            { $set: { is_delivered: true,paymentStatus:'PAID'} }
          );
        }
        res.status(200).json({
          success: true,
          message: "Order status updated successfully",
        });
      } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
}