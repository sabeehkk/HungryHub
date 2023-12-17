import userModel from "../../models/user.js";
import bcrypt from "bcrypt";

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

export const updateProfilePhoto = async (req, res) => {
  try {
    console.log(req.body, req.params, "datasassaaaaaaaas");
    const { userId } = req.params;
    const { url } = req.body;

    if (!userId || !url) {
      return res
        .status(400)
        .json({ message: "User ID or Profile Picture is missing" });
    }

    await userModel.updateOne(
      { _id: userId },
      { $set: { profilePicture: url } }
    );

    return res.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addAddress = async(req,res)=>{
  try {
    console.log(req.body);
    const id = req.body.id;
    const userAddress = await userModel.findOne({ _id: id });
    if (userAddress.Address.length < 3) {
      await userModel.updateOne(
        { _id: id },
        {
          $push: {
            Address: req.body.address,
          },
        }
      )
        .then(() => {
          res.status(201).send({
            success: true,
            message: "Address added success",
          });
        })
        .catch(() => {
          res.status(200).send({
            success: false,
            message: "something went wrong",
          });
        });
    } else {
      res.status(404).send({
        success: false,
        message: "Max Address Limit is 3",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "server error",
    });
  }
}

export const getUserData =async (req,res)=>{
  try {
    console.log(req.query,'getUserData');
    // if(req.query.id === undefined){
    //   return res.status(400).send({
    //     success: false,
    //     message: "User ID is missing",
    //   });
    // }

    const user = await userModel.findById(req.query.id);
    if (user) {
      res.status(200).send({
        success: true,
        user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "User data Not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "server error",
    });
  }
}

export const editAddress =async (req, res) => {
  console.log('inside edit address');
  
  const { id, address, index } = req.body;
  try {
    await userModel.updateOne(
      { _id: id },
      {
        $set: {
          [`Address.${index}`]: address,
        },
      }
    ).then((resp) => {
      res.status(200).send({
        success: true,
        message: "address edited success",
        resp,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error ",
      error,
    });
  }
}

