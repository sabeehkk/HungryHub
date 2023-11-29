import adminModel from '../../models/admin.js'
import userModel from '../../models/user.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

const LIMIT = 10;


export const login=async (req,res)=>{
    try {
      console.log(req.body);
        
        const {email,password}=req.body;
        const adminData =await adminModel.findOne({email})
        console.log(adminData,'admindataaaaaaaaaaaaaaaaaaaaaaa');
        if (!adminData) {
          console.log('inside ~admin');
            return res.status(400).json({
              message: "Invalid email address or email not found",
              error: true,
            });
          }
      

        const isPasswordVerified = bcrypt.compareSync(password,adminData.password)
        if (!isPasswordVerified) {
            return res.status(400).json({ message: "Invalid Password", error: true });
          }
        const token=jwt.sign(
            {admin:email,role:"admin"},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        
            )
            return res.json({message:"success",token,adminData})
        
    } catch (error) {
        console.error(error)
    return res.status(500).json({ message: "Internal server error", error: true });

    }
}

export const userList = async (req, res) => {
  try {
    console.log('userlistt');
    const PAGE = req?.query?.page
      ? req.query.page >= 1
        ? req.query.page
        : 1
      : 1;
    const SKIP = (PAGE - 1) * LIMIT;

    const userData = await userModel
      .find()
      .sort({ _id: -1 })
      .skip(SKIP)
      .limit(LIMIT);
      
    const TotalSize = await userModel.countDocuments();
    const size = Math.ceil(TotalSize / LIMIT);

    return res.json({ message: "success", userData, size });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const userUnblock = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await userModel.updateOne(
      { _id: id },
      { $set: { status: true } }
    );

    if (result.modifiedCount > 0) {
      return res.json({ message: "User Unblocked!!!" });
    }
    return res.status(404).json({ message: "User not found", error: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const userBlock = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await userModel.updateOne(
      { _id: id },
      { $set: { status: false } }
    );
    if (result.modifiedCount > 0) {
      return res.json({ message: "user Blocked!!!" });
    }
    return res.status(404).json({ message: "User not found", error: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};
