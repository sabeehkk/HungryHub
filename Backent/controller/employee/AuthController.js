import employeeModel from '../../models/employee.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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