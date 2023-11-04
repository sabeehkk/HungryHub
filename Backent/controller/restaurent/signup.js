import restaurentModel from '../../models/restaurent.js'

import bcrypt from 'bcrypt'


export const signup =async (req,res)=>{
    try{
        const {name, email, phoneNumber, password} = req.body ;
        const existUser = await restaurentModel.find({email,phoneNumber})
        if(existUser.length !==0){
              return res.json({message:'User Already exists'})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user=new restaurentModel({name,email,phoneNumber,password:hashedPassword})
        res.json({message:'success'})
    
        await user.save()
      }catch(error){
          console.log(error.message);
      }
}

