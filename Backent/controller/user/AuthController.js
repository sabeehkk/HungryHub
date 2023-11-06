import userModel from '../../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const signup = async (req,res)=>{
  console.log('kitttyyyyyyyyyyy'); 
  try{
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
          message: "Invalid email address or email not found",
          error: true,
        });
      }

      if (userData.status === false) {
        return res.status(400).json({
          message:
            "User Account Blocked: Please contact customer support for further assistance",
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