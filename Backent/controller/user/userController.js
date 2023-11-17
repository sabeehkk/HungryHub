import userModel from '../../models/user.js'


export const userProfile =async(req,res)=>{
    try {
         const result = await userModel.find()
         console.log(result,'userdataaaaaa');
    } catch (error) {
      console.log(error.message);
    }
}


export const updateProfile = async (req, res) => {
    try {
      const { userId } = req.params;
      const data = req.body;
  
      await userSchema.updateOne({ _id: userId }, data);
  
      return res.json({ message: "success" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
