import React, { useState } from "react";
import { ErrorMessage, SuccessMessage, validateEmail } from "../utils/util";
import { useNavigate } from "react-router-dom";

const ForgotPasswordFrame = ({ forgotPassword, forgotPasswordOtpVerification, resetPassword, role}) => {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [passwordSide, setPasswordSide] = useState(false);
  const [otpPart, setOtpPart] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const emailresult = validateEmail(email);

    if (!emailresult) {
      return ErrorMessage(" Email address is incorrect");
    }
    
    const result = await forgotPassword(email);
    if (result) {
      SuccessMessage(`OTP sent to the provided email: ${email}`);
      setOtpPart(true);
    }
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    if (otp.length != 6) {
      ErrorMessage("Incorrect OTP entered");
      return;
    }

    const result = await forgotPasswordOtpVerification(otp);
    if (result) {
      SuccessMessage("OTP successfully entered.");

      setOtpPart(false);
      setPasswordSide(true);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    const result = await resetPassword(email, password);
    if (result) {
        SuccessMessage("Password reset successful");
      setEmail("");
      setOtp("");
      setPassword("");
      setOtpPart(true);
      setPasswordSide(false);
      if(role !=='user'){
        navigate("/restaurent/login");
      }else{
        navigate("/login");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Forgot Your Password?
          </h2>
          {passwordSide ? (
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your new password.
            </p>
          ) : otpPart ? (
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter the OTP sent to your email address.
            </p>
          ) : (
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email address and we'll send you an OTP.
            </p>
          )}
        </div>
        {passwordSide ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmitPassword}>
            <input
              type="password"
              placeholder="New password"
              value={password}
              minLength={7}
              maxLength={7}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Set New Password
            </button>
          </form>
        ) : otpPart ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmitOTP}>
            <input
              type="number"
              placeholder="Enter OTP"
              value={otp}
              maxLength={6}
              minLength={6}
              onChange={(e) => setOtp(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Verify OTP
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmitEmail}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Reset Link
            </button>
          </form>
        )}
        {otpPart && (
          <p className="mt-2 text-center text-sm text-gray-600">
            Didn't receive the email?{" "}
            <button className="text-indigo-600" onClick={handleSubmitEmail}>
              Resend
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordFrame;
