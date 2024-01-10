import mongoose from "mongoose";
import OrderModel from '../../models/order.js'
import ProductModel from '../../models/product.js';
import UserModel from '../../models/user.js';
import RestaurentModel from '../../models/restaurent.js';
import ChatModel from '../../models/chat.js';
import EmployyeModel from '../../models/employee.js'

//viewOrders--------------------------------
export const viewOrders = async (req,res)=>{
    try {
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
// updateDeliveryStatus--------------------------
export const updateDeliveryStatus = async (req,res)=>{
  console.log(req.body,'inside delivery status');
    try {
        const { prodId, orderId, orderStatus,employeeId } = req.body;
    // const restId = new mongoose.Types.ObjectId(req.query.id);

        let item_orderStatus;
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
              "item.$.orderStatus":item_orderStatus,
            },
          }
        );
        if(item_orderStatus==='Delivered') {
          const employeeEarnings = await EmployyeModel.findOneAndUpdate(
            { _id: employeeId },
            {
              $inc: { ernings: orderStatus === "Delivered" ? 250 : 0 },
            },
            { new: true }
          );
        console.log(employeeEarnings,'employeeEarnings');

        }
     
        
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
// cancelOrder---------------------------
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
        res.status(200).json({
          success: true,
          message: "Item cancelled",
        });
        if (orderItem.paymentType !== "COD") {
          const formattedPrice = parseFloat(canceledProductPrice).toFixed(2);
          await UserModel.updateOne(
            { _id: userId },
          );
        }
      } else {
        res.status(400).json({
          success: false,
          message: "Item not found or cannot be cancelled.",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Order not found.",
      });
    }
  } catch (error) {
    console.error("Error cancelling item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
// dashboardData--------------------------------
export const dashboardData = async(req,res)=>{
  try {
    const restId = new mongoose.Types.ObjectId(req.query.id);
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
      res.status(200).json({
        success:true,
        totalSale,
        totalUsers,
        totalOrders
      })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"server error"
    })
  }
}
// splitOrder--------------------------
export const splitOrder = async(req,res)=>{
  console.log(req.body,'selected employee');
    try {
       const { orderId, employeeId } = req.body;
       const order = await OrderModel.findById(orderId);
       const ordersDetails = await OrderModel.findByIdAndUpdate(orderId, { employeeId: employeeId });
       const openChat = new ChatModel({
         userId:order.userId,
         employeeId:employeeId,
         orderId:orderId,
       })
       await openChat.save();
    } catch (error) {
      console.log(error);
    }
}