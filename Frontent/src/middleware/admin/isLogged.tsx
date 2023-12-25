import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/admin/authSlice";

const IsLogged = () => {
  const { success } = useSelector((state: any) => state.adminAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!success) {
      navigate("/admin/login");
    }
  }, [success]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      dispatch(logout());
      navigate("/admin/login");
    }
  });
  return null;
};

export default IsLogged;
