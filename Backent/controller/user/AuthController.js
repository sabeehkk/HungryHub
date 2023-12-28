import userModel from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateOTP, transporter } from "../../utils/utils.js";

let copyOtp;
// signup--------------------
export const signup = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const existUser = await userModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existUser) {
      return res.json({
        message: "User Already exists",
        error: true,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    res.json({ message: "success" });
    await user.save();
  } catch (error) {
    console.log(error.message);
  }
};
//userLogin-------------------------
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await userModel.findOne({ email });
    if (!userData) {
      return res.status(400).json({
        message: "Invalid email address or password",
        error: true,
      });
    }
    if (userData.status === false) {
      return res.status(400).json({
        message: "Admin-initiated account block",
        error: true,
      });
    }
    const isPasswordVerified = bcrypt.compareSync(password, userData.password);
    if (!isPasswordVerified) {
      return res.status(400).json({ message: "Invalid Password", error: true });
    }
    const token = jwt.sign(
      { user: userData._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ message: "success", token, userData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: true });
  }
};
//googleLogin------------------
export const googleLogin = async (req, res) => {
  try {
    const { email, family_name, given_name } = req.body;
    const result = await userModel.findOne({ email: email });
    if (result) {
      if (result.status === false) {
        return res.status(400).json({
          message:
            "User Account Blocked: Please contact customer support for further assistance",
          error: true,
        });
      }
      const token = jwt.sign(
        { user: result._id, role: "user" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.json({ message: "success", token, userData: result });
    }
    const userSchema = new userModel({
      email,
      name: given_name,
    });
    const response = await userSchema.save();
    const userData = await userModel.findOne({ email });
    const token = jwt.sign(
      { user: userData._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ message: "success", token, userData });
  } catch (error) {
    console.log(error.message);
  }
};
// Action---------------------------
const Action = async (req, res) => {
  const id = req.query.id;
  const status = req.query.status;
  await userModel
    .updateOne({ _id: id }, { $set: { status: status } })
    .then((result) => {
      res.json({ message: "success" });
    })
    .catch((error) => {
      console.log(error);
    });
};
// verifySignup-------------------
export const verifySignup = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const result = await userModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (result) {
      return res.status(404).json({
        message: "the user is already exsist ",
        error: true,
      });
    }
    const otp = generateOTP();
    copyOtp = otp;
    var mailOptions = {
      to: email,
      subject: "Otp for registration is: ",
      html:
        "<h3>OTP for account verification is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        otp +
        "</h1>",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      return res.status(200).json({ message: "success" });
    });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// verifyOtp----------------------------
export const verifyOtp = async (req, res) => {
  try {
    const { digitone, digitTwo, digitThree, digitFour, digitFive, digitSix } =
      req.body;
    const formOtp = `${digitone}${digitTwo}${digitThree}${digitFour}${digitFive}${digitSix}`;
    if (formOtp != copyOtp) {
      return res.status(401).json({ message: "Otp is Not valid " });
    } else if (formOtp === copyOtp) {
      return res.json({ message: "success" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await userModel.findOne({ email: email });

    if (!result) {
      return res.status(404).json({ message: "Email is not matched" });
    }

    if (result.status === false) {
      return res.status(400).json({
        message:
          "User Account Blocked: Please contact customer support for further assistance",
        error: true,
      });
    }

    const otp = generateOTP();
    console.log(otp);
    copyOtp = otp;

    const mailOptions = {
      to: email,
      subject: "OTP for Forgot password",
      html: `
        <h3>OTP for Forgot password is:</h3>
        <h1 style="font-weight: bold;">${otp}</h1>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(404).json({
          message: "The provided email does not match any registered user.",
        });
      }
      console.log("Message sent: %s", info.messageId);
      return res.status(200).json({ message: "success" });
    });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const otpVerification = async (req, res) => {
  try {
    console.log(req.body);
    const { otp } = req.body;
    if (otp != copyOtp) {
      return res.status(401).json({ message: "OTP is not Valied" });
    } else if (otp == copyOtp) {
      return res.json({ message: "success" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, email } = req.body;
    const saltRounds = parseInt(process.env.SALTROUNDS);
    if (!password || !email) {
      return res
        .status(400)
        .json({ message: "Both email and password are required." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await userModel.updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({
        message: "Email not found or password already set to the new value.",
      });
    }

    return res.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
