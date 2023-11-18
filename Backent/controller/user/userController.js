import userModel from '../../models/user.js'


export const updateProfile = async (req, res) => {
    try {
      console.log(req.body);
      const { userId } = req.params;
      const data = req.body;
  
      await userModel.updateOne({ _id: userId }, data);
  
      return res.json({ message: "success" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
