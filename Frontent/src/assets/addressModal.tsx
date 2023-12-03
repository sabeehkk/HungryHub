import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function AddressModal({
  isOpen,
  onClose,
  address,
  onSave,
  isEditing,
  setEditedAddress,
  editedAddress,
  setNewAddress,
  index,
}) {
//   const userId = useSelector((state) => state.user._id);
//   const { userdata } = useSelector((state: any) => state.userAuth);
const userdata = useSelector((state) => state.userAuth);
    const userId = userdata.user._id
    console.log(userdata.user._id,'userid in address modal');
    
  const [errors, setErrors] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    
    const { name, value } = e.target;

    let error = "";
    if (name === "street" && value.trim().length === 0) {
      error = "Street Address is required";
    } else if (name === "city" && value.trim() === "") {
      error = "City is required";
    } else if (name === "state" && value.trim() === "") {
      error = "State is required";
    } else if (name === "postalCode" && value.trim() === "") {
      error = "Postal Code is required";
    }
    // Update the errors state for the current field
    setErrors({ ...errors, [name]: error });

    if (isEditing) {
      setEditedAddress({ ...editedAddress, [name]: value });
    } else {
      setNewAddress({ ...address, [name]: value });
    }
  };

  const handleSave = () => {
    onSave(userId, index);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>

      <div
        className={`modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg overflow-y-auto transform ${
          isOpen ? "scale-100" : "scale-0"
        } transition-transform duration-500 ease-in-out`}
      >
        <div className="modal-header flex justify-between p-3 bg-cherry-Red text-off-White">
          <h2 className="text-xl font-semibold">
            {isEditing ? "Edit Address" : "Add Address"}
          </h2>
          <button className="modal-close text-3xl" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body p-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Street Address
          </label>
          <input
            type="text"
            name="street"
            value={isEditing ? editedAddress.street : address?.street}
            onChange={handleChange}
            placeholder={
              isEditing ? editedAddress[index]?.street : address?.street
            }
            className="w-full border rounded-md p-2"
            required
          />
          {errors.street && (
            <p className="text-red-500 text-sm">{errors.street}</p>
          )}
        </div>

        <div className="modal-body p-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            value={isEditing ? editedAddress.city : address?.city}
            onChange={handleChange}
            placeholder={isEditing ? editedAddress[index]?.city : address?.city}
            className="w-full border rounded-md p-2"
            required
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
        <div className="modal-body p-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            State
          </label>
          <input
            type="text"
            name="state"
            value={isEditing ? editedAddress.state : address?.state}
            onChange={handleChange}
            placeholder={
              isEditing ? editedAddress[index]?.state : address?.state
            }
            className="w-full border rounded-md p-2"
            required
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state}</p>
          )}
        </div>
        <div className="modal-body p-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            value={isEditing ? editedAddress.postalCode : address?.postalCode}
            onChange={handleChange}
            placeholder={
              isEditing ? editedAddress[index]?.postalCode : address?.postalCode
            }
            className="w-full border rounded-md p-2"
            required
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm">{errors.postalCode}</p>
          )}
        </div>

        <div className="modal-footer p-3 bg-gray-800 items-center justify-center flex">
          <button
            className="text-cherry-Red font-bold text-lg py-2 px-4 rounded"
            onClick={() => handleSave()}
            disabled={address === null}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressModal;
