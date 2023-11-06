import employeeModel from '../../models/employee.js'

import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'



export const signup = async (req,res)=>{
     console.log(req.body);
     try{
      console.log(req.body);
      const {name:restaurantName, email, phoneNumber, password} = req.body ;
      const existUser = await employeeModel.find({email,phoneNumber})
      if(existUser.length !==0){
            return res.json({message:'User Already exists'})
      }
      const hashedPassword = await bcrypt.hash(password,10)
      const user=new employeeModel({restaurantName,email,phoneNumber,password:hashedPassword})
      res.json({message:'success'})
  
      await user.save()
    }catch(error){
        console.log(error.message);
    }
}

export const login=async (req,res)=>{
    try {
        console.log('employee dataaaaa',req.body);

        const {email,password}=req.body;
        const employeeData =await employeeModel.findOne({email})
        console.log('employedataaaaaaa',employeeData);
        // console.log(employeeData,'restaurentdataaaaaaaaaaaaaaaaaaaaaaa');
        // if(!adminData){
        //     return res.json({message:'invalid email or password '})
        // }
        // const isPasswordCorrect=await bcrypt.compare(password,adminData.password)
        // if(!isPasswordCorrect){
        //     return res.json({message:'password is incorrect'})
        // }

        
        const isPasswordVerified = bcrypt.compareSync(password,employeeData.password)

        const token=jwt.sign(
            {employee:email,role:"employee"},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        
            )
            return res.json({message:"success",token,employeeData})
        
    } catch (error) {
        console.error(error)
    return res.status(500).json({ message: "Internal server error", error: true });

    }
}