import employeeModel from '../../models/employee.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateOTP, transporter } from "../../utils/utils.js";
let copyOtp;

// signup--------------------------
export const signup = async (req,res)=>{
     try{
      const {name, email, phoneNumber, password} = req.body ;
      const existUser = await employeeModel.find({email,phoneNumber})
      if(existUser.length !==0){
            return res.json({message:'Employee Already exists'})
      }
      const hashedPassword = await bcrypt.hash(password,10)
      const user=new employeeModel({name,email,phoneNumber,password:hashedPassword})
      res.json({message:'success'})
      await user.save()
    }catch(error){
        console.log(error.message);
    }
}
// login------------------------
export const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const employeeData =await employeeModel.findOne({email})
        if (!employeeData) {
          return res.status(400).json({
            message: "Invalid email address or password",
            error: true,
          });
        }
        if (employeeData.status === false) {
            return res.status(400).json({
              message:
                " Admin-initiated account block ",
              error: true,
            });
          }
        const isPasswordVerified = bcrypt.compareSync(password,employeeData.password)
        if (!isPasswordVerified) {
            return res.status(400).json({ message: "Invalid Password", error: true });
          }
        const token=jwt.sign(
            {employee:email,role:"employee"},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
            )
            return res.json({message:"success",token,employeeData})
     } catch (error) {
     return res
     .status(500)
     .json({message:'internal server error',error:true})
   }
}

export const forgotPassword =async (req,res)=>{
  console.log(req.body,'inside forgot password');
  const { email } = req.body;
  try {
    console.log('inside employee password');
    const result = await employeeModel.findOne({ email: email });

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
    console.log(req.body);
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
    console.log(req.body,'inside reset password employee');
    const { password, email } = req.body;
    const saltRounds = parseInt(process.env.SALTROUNDS);
    console.log(saltRounds,'salt rounds');

    if (!password || !email) {
      return res
        .status(400)
        .json({ message: "Both email and password are required." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await employeeModel.updateOne(
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