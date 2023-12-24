import OrderModel from '../../models/order.js'
import EmployeeModel from '../../models/employee.js'
import mongoose from "mongoose";
import ChatModel from "../../models/chat.js"


export const getEmplOrders= async (req, res) => {
    try {
        console.log(req.query,'getEmplOrders is called');
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

  export const listEmployees = async (req, res) => {
    try {
      console.log('listEmploy is working');
       const listEmployees = await EmployeeModel.find({})
       res.status(200).send({
         success: true,
         listEmployees,
       });
    } catch (error) {
      console.log(error.message);
    }
  }

export const updateDeliveryStatus = async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
}

export const getChat = async (req,res) => {
  try {
   console.log(req.query,'inside getChat');
   const id = req.query.id;
   const orderId =new mongoose.Types.ObjectId(req.query.id);
   console.log(orderId,'orderId');
   const findChat = await ChatModel.find({orderId:orderId}).populate('employeeId').populate('userId');
   if(findChat){
     res.status(200).send({
       success: true,
       findChat,
     });
   }else{
     res.status(404).send({
       success: false,
       message: "Chat not found",
     });
   }
   console.log(findChat,'findChat');
  } catch (error) {
   console.log(error);
  }
}

export const saveChat = async (req, res) => {
  try {
    console.log(req.body, 'inside saveChat');
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