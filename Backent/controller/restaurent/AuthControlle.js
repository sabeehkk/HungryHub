import restaurentModel from '../../models/restaurent.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


export const signup =async (req,res)=>{
    try{
        console.log(req.body);
        const {name, email, phoneNumber, password,place} = req.body ;
        // const existRestorent = await restaurentModel.find({email,phoneNumber})
        // if(existRestorent.length !==0){
        //       return res.json({message:'Restaurent Already exists'})
        // }
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
        console.log('restaurentttt',restaurent);
        res.json({message:'success'})
    
        await restaurent.save()
      }catch(error){
          console.log(error.message);
      }
}



export const login=async (req,res)=>{
    try {

        console.log('Restaurentdataaaaaaaa',req.body)
        const {email,password}=req.body;
        const restaurentData=await restaurentModel.findOne({email})
        console.log(restaurentData,'restaurentdataaaaaaaaaaaaaaaaaaaaaaa');

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
        console.log('tokennnnn',token);
        return res.json({message:"success",token,restaurentData})
 
   } catch (error) {
     return res
     .status(500)
     .json({message:'internal server error',error:true})
   }
}

export const updateRestoProfilePhoto = async (req, res) => {
  console.log('resto profile is working');
  try {
    console.log(req.body, req.params, "datasassaaaaaaaas");
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