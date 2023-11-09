import adminModel from '../../models/admin.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        console.log(req.body);
        const adminData =await adminModel.findOne({email})
        console.log(adminData,'admindataaaaaaaaaaaaaaaaaaaaaaa');
        if (!adminData) {
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

// export const UserData=async (req,res)=>{
//   try {
//       console.log(req.headers);
//       const userData=await userModel.find({})
//       const userCount = await userModel.countDocuments({});
//       const blockedUserCount=await userModel.countDocuments({status:false})
//       res.json({userData,userCount,blockedUserCount})
//   } catch (error){
//       console.log(error.message);
//    }
// }
 
export const action =async(req,res)=>{
  const id = req.query.id;
  const status = req.query.status;
  await userModel.updateOne({_id: id}, {$set: {status: status}})
  .then((result)=>{
      res.json({message:'success'});
  })
  .catch((error)=>{
      console.log(error);
  })
}