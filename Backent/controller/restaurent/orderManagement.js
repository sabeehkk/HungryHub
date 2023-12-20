import mongoose from "mongoose";

import OrderModel from '../../models/order.js'
import ProductModel from '../../models/product.js';
import UserModel from '../../models/user.js';
import RestaurentModel from '../../models/restaurent.js';


export const viewOrders = async (req,res)=>{
  console.log('function viewOrders');
    try {
   
        console.log(req.query,'inside view order');
        const id = req.query.id;
        if(id ==='undefined'){
          return res.status(400).json({message:''})
        }
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
          res.status(200).json({
            success: true,
            orders,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "You don't have any order",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
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
        // if (orderStatus === "Pending") {
        //   item_orderStatus = "Preparing...";
        // } else if (orderStatus === "Preparing...") {
        //   item_orderStatus = "Packed";
        // } else if (orderStatus === "Packed") {
        //   item_orderStatus = "Out of delivery";
        // } else {
        //   item_orderStatus = "Delivered";
        // }

        if (orderStatus === "Pending") {
          item_orderStatus = "Pending";
        } else if (orderStatus === "Preparing...") {
          item_orderStatus = "Preparing...";
        } else if (orderStatus === "Packed") {
          item_orderStatus = "Packed";
        } else if (orderStatus === "Out of delivery") {
          item_orderStatus = "Out of delivery";
        } else if (orderStatus === "Delivered") {
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

export const cancelOrder = async (req,res)=>{
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
        
        // Update order details to cancel the item and remove restaurantId
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
          const formattedPrice = parseFloat(canceledProductPrice).toFixed(2);
          await UserModel.updateOne(
            { _id: userId },
            // {
            //   $inc: { Wallet: parseFloat(formattedPrice) }
            // }
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

export const dashboardData = async(req,res)=>{
  try {
    console.log(req.query) 
    // const restId = req.query.id
    const restId = new mongoose.Types.ObjectId(req.query.id);
    console.log(restId,'restId');
    const totalSale = await OrderModel.aggregate([
      {$match : { paymentStatus:'PAID', restaurantId: restId}},   
      {$group : { _id: "$restaurantId", total : {$sum :"$grandTotal"}}}]) 
      console.log(totalSale,'totalSales');

      const totalUsers = await OrderModel.aggregate([
        {
          $match: { restaurantId: restId } 
        },
        {
          $group: {
            _id: "$userId", 
            users: { $addToSet: "$userId" },
            total: { $sum: 1 } 
          }
        },
        {
          $project: {
            _id: 0,
            totalUsers: { $size: "$users" }
          }
        }
      ]);
      console.log(totalUsers,'totalUsers');

  // const totalOrders = await OrderModel.aggregate([
  //   {
  //     $match: {
  //       is_returned: 0,
  //       // is_delivered: true,
  //       restaurantId: restId 
  //     }
  //   },
  //   {
  //     $group: {
  //       _id: "$restaurantId", 
  //       total: { $sum: 1 } 
  //     }
  //   }
  // ]);    
  // const totalOrders = await OrderModel.countDocuments();
  const totalOrders = await OrderModel.aggregate([
    {
      $match: { restaurantId: restId }
    },
    {
      $group: {
        _id: {
          restaurantId: "$restaurantId",
          userId: "$userId"
        },
        orders: { $addToSet: "$_id" }
      }
    },
    {
      $group: {
        _id: "$_id.restaurantId",
        totalOrders: { $sum: { $size: "$orders" } }
      }
    }
  ]);
  console.log(totalOrders);
  

  console.log(totalOrders,'totalOrders');
      res.status(200).send({
        success:true,
        totalSale,
        totalUsers,
        totalOrders
      })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"server error"
    })
  }
}