import adminModel from '../../models/admin.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        console.log(req.body);
        const adminData =await adminModel.findOne({email})
        console.log(adminData,'admindataaaaaaaaaaaaaaaaaaaaaaa');
        // if(!adminData){
        //     return res.json({message:'invalid email or password '})
        // }
        // const isPasswordCorrect=await bcrypt.compare(password,adminData.password)
        // if(!isPasswordCorrect){
        //     return res.json({message:'password is incorrect'})
        // }

        const isPasswordVerified = bcrypt.compareSync(password,adminData.password)

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