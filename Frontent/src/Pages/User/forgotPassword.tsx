import React from "react";
import ForgotPasswordFrame from "../../Components/forgotPasswordFrame";
import {
  forgotPassword,
  forgotPasswordOtpVerification,
  resetPassword,
} from "../../api/userApi";

const ForgotPassword = () => {
  return (
    <ForgotPasswordFrame
      forgotPassword={forgotPassword}
      forgotPasswordOtpVerification={forgotPasswordOtpVerification}
      resetPassword={resetPassword}
      role={"user"}
    />
  );
};

export default ForgotPassword;
