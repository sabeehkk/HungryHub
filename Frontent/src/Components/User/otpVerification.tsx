import { useRef, useState, useEffect } from "react";
import { render } from "react-dom";
import { verifyOtp } from "../../Components/User/UserREgister";
import axios from "axios";


const OtpVerification = ({handleSumbit}) => {
  const inputRef = useRef({});
  const [otp, setOtp] = useState({
    digitone: "",
    digitTwo: "",
    digitThree: "",
    digitFour: "",
    digitFive: "",
    digitSix: "",
  });
  useEffect(() => {
    inputRef.current[0].focus();
    inputRef.current[0].addEventListener("paste", pasteText);
    // return () => inputRef.current[0].removeEventListener("paste", pasteText);
  }, [] );   
  
  const pasteText = (event:any) => {
    const pastedText = event.clipboardData.getData("text");
    const fieldValues = {};
    Object.keys(otp).forEach((keys, index) => {
      fieldValues[keys] = pastedText[index];
      inputRef.current[5].focus();
    });
    setOtp(fieldValues);
  };

  const handleChange = (event:any, index:any) => {
    const { name, value } = event.target;

    if (/[a-z]/gi.test(value)) return;

    setOtp((prev) => ({
      ...prev,
      [name]: value.slice(-1),
    }));
    // event.target.nextSibling.focus( )
    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };
  console.log(inputRef.current);

  const handleBackspace = (event:any, index:any) => {
    if (event.key === "Backspace") {
      if (index > 0) {
        inputRef.current[index - 1].focus();
      }
    }
  };

  const renderInput = () => {
    return Object.keys(otp).map((keys, index) => (
      <input
        name={keys}
        ref={(element) => (inputRef.current[index] = element)}
        type="text"
        value={otp[keys]}
        className="w-16 h-12 flex items-center justify-center text-center  outline-none rounded-md border border-gray-500 text-xl  bg-white focus:bg-gray-100 focus:ring-1 ring-blue-700"
        id=""
        onChange={(event) => handleChange(event, index)}
        onKeyUp={(event) => handleBackspace(event, index)}
      />
    ));
  };
  console.log(otp);
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12">
      <div className="bg-white p-6 shadow-xl mx-auto w-full max-w-md rounded-2xl">
        <div className="flex flex-col items-center space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email ba**@dipainhouse.com</p>
            </div>
          </div>
          <div>
            <form action="" className="flex flex-row">
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row space-x-4">{renderInput()}</div>
                <div className="flex flex-col space-y-1 space-x-">
                  <div>
                    <button type="button" onClick={()=>handleSumbit(otp)} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-blue-700 border-none text-white text-sm shadow-sm">
                      Verify Account
                    </button>
                  </div>
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>{" "}
                    <a
                      className="flex flex-row items-center text-blue-600"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OtpVerification;
