import { useDispatch } from "react-redux";
import { logout } from "../../redux/admin/authSlice";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import React from "react";

function AdminLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    dispatch(logout());
    navigate("/admin/login");
  }, []);
  return <></>;
}

export default AdminLogout;
