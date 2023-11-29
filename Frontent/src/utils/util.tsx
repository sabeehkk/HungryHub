
import { toast } from "react-toastify";
import { restaurentsData, restaurentActionAPI } from "../../api/adminApi";
import Swal from "sweetalert2";

export const ErrorMessage = (message: string): void => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const SuccessMessage = (message: string): void => {
  toast.success(message, {
    position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
  });
};

export const SwalAlert = async (result) => {
  const resultt = await Swal.fire({
    title: "Do you really want to delete this product?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel",
  
  });
  return resultt

};
export const validateEmail = (email)=> {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}