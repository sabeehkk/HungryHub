import userModel from "../../models/user.js";
import bcrypt from "bcrypt";
import OrderModel from "../../models/order.js"
import emmployeeModel from '../../models/employee.js'
import ChatModel from "../../models/chat.js"
import mongoose from "mongoose";

// updateProfile-----------------------
export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = req.body;
    await userModel.updateOne({ _id: userId }, data);
    return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// updatePassword-------------------------
export const updatePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password) {
      const isPasswordVerified = bcrypt.compareSync(
        currentPassword,
        user.password
      );
      if (!isPasswordVerified) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }
    }
    const saltRounds = parseInt(process.env.SALTROUNDS);
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await userModel.updateOne(
      { _id: userId },
      { $set: { password: hashedPassword } }
    );
    return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
 // updateProfilePhoto-------------------------------
export const updateProfilePhoto = async (req, res) => {
  try {
    const { userId } = req.params;
    const { url } = req.body;
    if (!userId || !url) {
      return res
        .status(400)
        .json({ message: "User ID or Profile Picture is missing" });
    }
    await userModel.updateOne(
      { _id: userId },
      { $set: { profilePicture: url } }
    );
    return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//addAddress-----------------------------------
export const addAddress = async(req,res)=>{
  try {
    const id = req.body.id;
    const userAddress = await userModel.findOne({ _id: id });
    if (userAddress.Address.length < 3) {
      await userModel.updateOne(
        { _id: id },
        {
          $push: {
            Address: req.body.address,
          },
        }
      )
      .then(() => {
       res.status(201).send({
       success: true,
       message: "Address added success",
          });
        })
        .catch(() => {
          res.status(200).send({
            success: false,
            message: "something went wrong",
          });
        });
    } else {
      res.status(404).send({
        success: false,
        message: "Max Address Limit is 3",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "server error",
    });
  }
}
// getUserData------------------------------
export const getUserData =async (req,res)=>{
  try {
    const user = await userModel.findById(req.query.id);
    if (user) {
      res.status(200).send({
        success: true,
        user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User data Not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "server error",
    });
  }
}
// editAddress-----------------------------
export const editAddress =async (req, res) => {
  const { id, address, index } = req.body;
  try {
    await userModel.updateOne(
      { _id: id },
      {
        $set: {
          [`Address.${index}`]: address,
        },
      }
    ).then((resp) => {
      res.status(200).send({
        success: true,
        message: "address edited success",
        resp,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error ",
      error,
    });
  }
}
// saveChat----------------------------
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
 // getChat---------------------------------
export const getChat = async (req,res) => {
   try {
    const id = req.query.id;
    const orderId =new mongoose.Types.ObjectId(req.query.id);
    const findChat = await ChatModel.find({orderId:orderId}).populate('userId').populate('employeeId')
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
   } catch (error) {
    console.log(error);
   }
}