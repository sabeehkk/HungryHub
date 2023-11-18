import userModel from '../../models/user.js'
import bcrypt from 'bcrypt'

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
  export const updatePassword = async (req, res) => {
    try {
      const { userId } = req.params;
      const { currentPassword, newPassword } = req.body;
      const user = await userModel.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.password) {
        const isPasswordVerified = bcrypt.compareSync(
          currentPassword,
          user.password
        );
        if (!isPasswordVerified) {
          return res
            .status(400)
            .json({ message: "Current password is incorrect" });
        }
      }
  
      const saltRounds = parseInt(process.env.SALTROUNDS);
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
      await userModel.updateOne(
        { _id: userId },
        { $set: { password: hashedPassword } }
      );
  
      return res.json({ message: "success" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };