import restaurentModel from '../../models/restaurent.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


export const signup =async (req,res)=>{
    try{
        console.log(req.body);
        const {name, email, phoneNumber, password} = req.body ;
        const existEmployee = await restaurentModel.find({email,phoneNumber})
        if(existEmployee.length !==0){
              return res.json({message:'User Already exists'})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const employee=new restaurentModel({name:name,email,phoneNumber,password:hashedPassword})
        res.json({message:'success'})
    
        await employee.save()
      }catch(error){
          console.log(error.message);
      }
}



export const login=async (req,res)=>{
    try {
        console.log('restaurent dataaaaa',req.body);

        const {email,password}=req.body;
        const restaurentData =await restaurentModel.findOne({email})
        console.log(restaurentData,'restaurentdataaaaaaaaaaaaaaaaaaaaaaa');
        // if(!adminData){
        //     return res.json({message:'invalid email or password '})
        // }
        // const isPasswordCorrect=await bcrypt.compare(password,adminData.password)
        // if(!isPasswordCorrect){
        //     return res.json({message:'password is incorrect'})
        // }

        const isPasswordVerified = bcrypt.compareSync(password,restaurentData.password)

        const token=jwt.sign(
            {restaurent:email,role:"restaurent"},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        
            )
            return res.json({message:"success",token,restaurentData})
        
    } catch (error) {
        console.error(error)
    return res.status(500).json({ message: "Internal server error", error: true });

    }
}