import userModel from '../../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateOTP, transporter } from "../../utils/utils.js";

let copyOtp;


export const signup = async (req,res)=>{  
  try{
    console.log(req.body);
    const {name, email, phoneNumber, password} = req.body ;
    const existUser = await userModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existUser) {
      return res.json({
        message: "User Already exists",
        error: true,
      });
    }
   
    const hashedPassword = await bcrypt.hash(password,10)
    const user=new userModel({name,email,phoneNumber,password:hashedPassword})
    res.json({message:'success'})

    await user.save()

  }catch(error){
      console.log(error.message);
  }
}

export const userLogin=async (req,res)=>{
  try {

       console.log('userdataaaaaaaa',req.body)
       const {email,password}=req.body;
       const userData=await userModel.findOne({email})
       console.log('userdataa from backend',userData);

       if (!userData) {
        return res.status(400).json({
          message: "Invalid email address or password",
          error: true,
        });
      }

      if (userData.status === false) {
        return res.status(400).json({
          message:
          "Admin-initiated account block",
          error: true,
        });
      }
       const isPasswordVerified = bcrypt.compareSync(password, userData.password);
       if (!isPasswordVerified) {
         return res.status(400).json({ message: "Invalid Password", error: true });
       }
   
       const token=jwt.sign(
        {user:userData._id,role:"user"},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
       );
       return res.json({message:"success",token,userData})
  } catch (error) {
    return res
    .status(500)
    .json({message:'internal server error',error:true})
  }
}

 export  const googleLogin =async (req,res)=>{
      try {
        console.log(req.body);   
        const {email,family_name,given_name}=req.body;
        const result = await userModel.findOne({email:email})
        if(result){
          if(result.status===false){
            return res.status(400).json({
              message:"User Account Blocked: Please contact customer support for further assistance",
                  error:true,
            });
          }

          
          const token=jwt.sign(
            {user:result._id,role:"user"},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
          );
          return res.json({message:"success",token,userData:result})
        }

        const userSchema=new userModel({
          email,
          name:given_name
        })

        const response=await userSchema.save();

        const userData = await userModel.findOne({ email })

        const token = jwt.sign(
          { user: userData._id, role: "user" },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        return res.json({ message: "success", token, userData });

    
      } catch (error) {
        console.log(error.message);
      }
}

const Action =async(req,res)=>{ 
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

export const verifySignup = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    const result = await userModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (result) {
      return res.status(404).json({
        message: "the user is already exsist ",
        error: true,
      });
    }

    const otp = generateOTP();
    console.log('generate otp',otp);
    copyOtp = otp;
    var mailOptions = {
      to: email,
      subject: "Otp for registration is: ",
      html:
        "<h3>OTP for account verification is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        otp +
        "</h1>",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
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



export const verifyOtp=async(req,res)=>{
    try {
      console.log('verifing');
      const { digitone, digitTwo, digitThree, digitFour, digitFive, digitSix } = req.body;

      const formOtp = `${digitone}${digitTwo}${digitThree}${digitFour}${digitFive}${digitSix}`;
      console.log('formotttpppp',formOtp);
      console.log('copyotttpppp',copyOtp);
      if (formOtp != copyOtp) {
        return res.status(401).json({ message: "Otp is Not valid " });
      } else if (formOtp === copyOtp) {
        console.log('success aayi');
        return res.json({ message: "success" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
}