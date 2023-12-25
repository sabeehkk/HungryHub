import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/employee/authSlice";

const IsLogged = () => {
  const { success } = useSelector((state: any) => state.employeeAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!success) {
      navigate("/employee/login");
    }
  }, [success]);

  useEffect(() => {
    const token = localStorage.getItem("employeeToken");
    if (!token) {
      dispatch(logout());
      navigate("/employee/login");
    }
  });
  return null;
};

export default IsLogged;
