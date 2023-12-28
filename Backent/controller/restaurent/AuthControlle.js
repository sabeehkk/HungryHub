import restaurentModel from '../../models/restaurent.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { generateOTP, transporter } from "../../utils/utils.js";
let copyOtp;


// signup--------------------------
export const signup =async (req,res)=>{
    try{
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


export const forgotPassword =async (req,res)=>{
  const { email } = req.body;
  try {
    const result = await restaurentModel.findOne({ email: email });

    if (!result) {
      return res.status(404).json({ message: "Email is not matched" });
    }
    
    if (result.status === false) {
      return res.status(400).json({
        message:
          "User Account Blocked: Please contact customer support for further assistance",
        error: true,
      });
    }

    const otp = generateOTP();
    console.log(otp);
    copyOtp = otp;

    const mailOptions = {
      to: email,
      subject: "OTP for Forgot password",
      html: `
        <h3>OTP for Forgot password is:</h3>
        <h1 style="font-weight: bold;">${otp}</h1>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(404).json({
          message: "The provided email does not match any registered user.",
        });
      }
      console.log("Message sent: %s", info.messageId);
      return res.status(200).json({ message: "success" });
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const otpVerification =async (req,res)=>{
  try {
    const { otp } = req.body;
    if (otp != copyOtp) {
      return res.status(401).json({ message: "OTP is not Valied" });
    } else if (otp == copyOtp) {
      return res.json({ message: "success" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
export const resetPassword = async (req, res) => {
  try {
    const { password, email } = req.body;
    const saltRounds = parseInt(process.env.SALTROUNDS);
    if (!password || !email) {
      return res
        .status(400)
        .json({ message: "Both email and password are required." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await restaurentModel.updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({
        message: "Email not found or password already set to the new value.",
      });
    }

    return res.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};