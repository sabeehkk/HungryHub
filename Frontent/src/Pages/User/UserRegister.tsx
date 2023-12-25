import React from "react";
import LoginFrame from "../../Components/loginFrame";
import Signup from "../../Components/User/UserREgister";

function UserRegister() {
  const imgUrl: string =
    "https://img.lovepik.com/photo/45009/7677.jpg_wh860.jpg";
  return <LoginFrame SidePart={Signup} img={imgUrl} />;
}

export default UserRegister;
