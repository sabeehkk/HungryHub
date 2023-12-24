import restaurentModel from '../../models/restaurent.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

// signup--------------------------
export const signup =async (req,res)=>{
    try{
        console.log(req.body);
        const {name, email, phoneNumber, password,place} = req.body ;
        const existUser = await restaurentModel.findOne({
          $or: [{ email }, { phoneNumber }],
        });
        if (existUser) {
          return res.json({
            message: "Restaurent Already exists",
            error: true,
          });
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const restaurent=new restaurentModel({restaurantName:name,email,phoneNumber,password:hashedPassword,place:place})
        res.json({message:'success'})
        await restaurent.save()
      }catch(error){
          console.log(error.message);
      }
  }
// login-------------------------------
export const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const restaurentData=await restaurentModel.findOne({email})
        if (!restaurentData) {
          return res.status(400).json({
            message: "Invalid email address or email not found",
            error: true,
          });
        }
       if (restaurentData.status === false) {
         return res.status(400).json({
           message:
             " Admin-initiated account block",
           error: true,
         });
       }
        const isPasswordVerified = bcrypt.compareSync(password, restaurentData.password);
        if (!isPasswordVerified) {
          return res.status(400).json({ message: "Invalid Password", error: true });
        }
        const token=jwt.sign(
         {restaurent:email,role:"restaurent"},
         process.env.JWT_SECRET,
         {expiresIn:"1h"}
        );
        return res.json({message:"success",token,restaurentData})
   } catch (error) {
     return res
     .status(500)
     .json({message:'internal server error',error:true})
   }
 }
// updateRestoProfilePhoto---------------------------
export const updateRestoProfilePhoto = async (req, res) => {
  try {
    const { userId } = req.params;
    const { url } = req.body;
    if (!userId || !url) {
      return res
        .status(400)
        .json({ message: "Restaurent ID or Profile Picture is missing" });
    }
    await restaurentModel.updateOne(
      { _id: userId },
      { $set: { profilePicture: url } }
    );
    return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};