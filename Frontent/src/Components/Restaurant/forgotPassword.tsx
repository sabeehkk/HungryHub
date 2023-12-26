import React from "react";
import ForgotPasswordFrame from "../../Components/forgotPasswordFrame";
import {
  forgotPassword,
  forgotPasswordOtpVerification,
  resetPassword,
} from "../../api/restaurentApi";

const ForgotPassword = () => {
  return (
    <ForgotPasswordFrame
      forgotPassword={forgotPassword}
      forgotPasswordOtpVerification={forgotPasswordOtpVerification}
      resetPassword={resetPassword}
      role={"restaurent"}
    />
  );
};

export default ForgotPassword;
