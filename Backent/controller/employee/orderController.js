import OrderModel from '../../models/order.js'
import EmployeeModel from '../../models/employee.js'
import mongoose from "mongoose";
import ChatModel from "../../models/chat.js"

//getEmplOrders-------------------------
export const getEmplOrders= async (req, res) => {
    try {
      const id = req.query.id;
      const ordersDetails = await OrderModel.find({
      })
        .sort({ _id: -1 })
        .populate({
          path: "item.product",
          model: "product",
          populate: {
            path: "restaurent_id",
            model: "Restaurant",
          },
        })
        .populate("userId");
      if (ordersDetails) {
        res.status(200).json({
          success: true,
          ordersDetails,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "No orders found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
// listEmployees--------------------------------
  export const listEmployees = async (req, res) => {
    try {
       const listEmployees = await EmployeeModel.find({})
       res.status(200).send({
         success: true,
         listEmployees,
       });
    } catch (error) {
      console.log(error.message);
    }
  }
//getChat----------------------------
export const getChat = async (req,res) => {
  try {
   const id = req.query.id;
   const orderId =new mongoose.Types.ObjectId(req.query.id);
   const findChat = await ChatModel.find({orderId:orderId}).populate('employeeId').populate('userId');
   if(findChat){
     res.status(200).send({
       success: true,
       findChat,
     }) ;
   }else{
     res.status(404).send({
       success: false,
       message: "Chat not found",
     });
   }
  } catch (error) {
   console.log(error);
  }
}
//saveChat----------------------
export const saveChat = async (req, res) => {
  try {
    const { orderId, chat } = req.body;
    const chatFind = await ChatModel.findOne({ orderId: orderId });
    if (chatFind) {
      await ChatModel.findOneAndUpdate({ orderId: orderId }, { $push: { chat: chat } });
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const dashboardData = async(req,res)=>{
    try {
      console.log(req.query,'dashboard');
      const employeeId = new mongoose.Types.ObjectId(req.query.id);
      const employee = await EmployeeModel.findById({_id:employeeId})
      const totalEarnings = employee.ernings
      console.log(totalEarnings,'totalEarnings');
       await res.json({ success: true, totalEarnings: totalEarnings})
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal Server Error"})
    }
}