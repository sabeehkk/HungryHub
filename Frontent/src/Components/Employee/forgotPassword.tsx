import React from "react";
import ForgotPasswordFrame from "../../Components/forgotPasswordFrame";
import {
  forgotPassword,
  forgotPasswordOtpVerification,
  resetPassword,
} from "../../api/employeeApi";

const ForgotPassword = () => {
  return (
    <ForgotPasswordFrame
      forgotPassword={forgotPassword}
      forgotPasswordOtpVerification={forgotPasswordOtpVerification}
      resetPassword={resetPassword}
      role={"employee"}
    />
  );
};

export default ForgotPassword;
