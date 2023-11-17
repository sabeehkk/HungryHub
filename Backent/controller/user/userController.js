import userModel from '../../models/user.js'


export const userProfile =async(req,res)=>{
    try {
         const result = await userModel.find()
         console.log(result,'userdataaaaaa');
    } catch (error) {
      console.log(error.message);
    }
}


