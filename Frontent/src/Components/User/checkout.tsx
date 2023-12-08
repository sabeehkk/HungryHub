
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userAxios } from "../../axios/axios";
import AddressModal from "../../assets/addressModal";

const Checkout=()=> {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [payment, setPayment] = useState("COD");
  const [is_change, set_change] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartData, setCartData] = useState();


    // console.log(cartData.items[0].productId.images,'cartDatas in checkout page');
    

  const [address, setAddress] = useState([
    {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  ]);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
const navigate =useNavigate()
const user = useSelector((state) => state.userAuth);
useEffect(() => {
    userAxios.get(`/getUserData?id=${user.user._id}`).then((response) => {
      //   setUserData(response);
      setAddress(response?.data?.user?.Address);
    });
  }, [is_change]);

   console.log(user.user._id,'userDatas');
//   console.log(result,'userdatasss id checking');
  useEffect(() => {
    userAxios.get(`/getCart?id=${user.user._id}`).then((response) => {
      const items = response.data
      console.log(items,'items in checkout page');
      setCartData(response.data.cartData);
      });
  }, [is_change]);
  const handleSaveAddress = (userId) => {
     let result = userId
     console.log(result,'insid savee adrres');
     
    if (
      newAddress.street.trim().length === 0 ||
      newAddress.city.trim().length === 0 ||
      newAddress.state.trim().length === 0 ||
      newAddress.postalCode.trim().length === 0
    ) {
      toast.error("Please fill all field", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } else {
      userAxios.patch("/addAddress", { id: userId, address: newAddress })
        .then((response) => {
          if (response) {
            set_change(!is_change);
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          } else {
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        });
    }

    setIsModalOpen(false);
  };
  const handleRadioChange = (index) => {
    setSelectedAddressIndex(index);
  };
  const handlePaymentRadio = (payMethod) => {
    setPayment(payMethod);
  };

  const placeOrder = (payment) => {
    console.log(payment,'payment data');
    
    if (selectedAddressIndex == null) {
      toast.error("Please select address", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else if(payment==='COD'){
      userAxios.post("/order", {
        payment,
        addressIndex: selectedAddressIndex,
        cartData,
      }).then((response) => {
        if(response.data.data){
          initPayment(response.data.data)
        }else{
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        navigate("/OrderSuccess");
      }
      }).catch((err)=>{
        toast.error(err.response?.data?.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
      })
    }
  };
  return (
    <div className="lg:ml-16 md:mr-16 mb-7 mt-7">
    <div className="lg:flex w-full md:p-5">
      <div className="lg:w-2/3 lg:ml-2 h-screan">
      
        <div className="w-full lg:p-10 leading-loose">
          <label className="block text-sm font-medium text-gray-700 underline">
            Select Address :
          </label>
          <div className="flex items-center justify-around">
            {address?.map((elem, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="selectedAddress"
                  value={index}
                  checked={selectedAddressIndex === index}
                  onChange={() => handleRadioChange(index)}
                />
                <p>Street: {elem?.street}</p>
                <p>City: {elem?.city}</p>
                <p>State: {elem?.state}</p>
                <p>Postal Code: {elem?.postalCode}</p>
              </div>
            ))}
          </div>
   
       
        </div>
           <button
           style={{ backgroundColor: '#3498db', color: '#fff', border:'none' }}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add Address
          </button>

        <AddressModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          address={newAddress}
          onSave={handleSaveAddress}
          setNewAddress={setNewAddress}
        />
      </div>

      <div className="lg:w-1/3 h-screen">
        <div className=" border w-full bg-pink-100 lg:p-10">
        {/* <label htmlFor="couponNo" className="block font-medium">
          Enter Coupon
        </label>
        <input
          type="text"
          id="couponNo"
          value={couponCode}
          onChange={(e)=> setCouponCode(e.target.value)}
          className="border border-gray-300 rounded-sm w-full bg-gray-300 py-1"
          />
           <button onClick={applayCoupon} className="text-off-White mb-5 mt-2 rounded-sm bg-cherry-Red p-1">
          Applay Coupon
        </button> */}
          <div className="h-full  shadow-md ">
            <div className="space-y-4 p-4">
              <h1>
                Total: <span className="float-right">{cartData?.total}</span>
              </h1>
              <h1>
                Charges:<span className="float-right">{0}</span>
              </h1>
              <h1>
                Discount:{" "}
                <span className="float-right">{cartData?.discount}</span>
              </h1>
              <h1>
                Grand Total:{" "}
                <span className="float-right">{cartData?.grandTotal}</span>
              </h1>
            </div>



            <div className="mb-4">
              {/* Check if cartData.items exists before mapping over it */}
              {cartData?.items && cartData.items.length > 0 && (
                cartData.items.map((item, index) => (
                  <img
                    key={index}
                    src={item.productId.images[0]}
                    alt={`Product ${index + 1}`}
                    className="w-full rounded-lg object-cover h-96 mb-4"
                  />
                ))
              )}
            </div>


            <div>
              <div className="flex justify-between pl-3 pr-3 pt-14">
                <div className="">
                  <input
                    type="radio"
                    name="selectPayment"
                    value={"COD"}
                    checked={payment === "COD"}
                    onChange={() => handlePaymentRadio("COD")}
                  />
                  <label className="ml-1">COD</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="selectPayment"
                    value={"Online"}
                    checked={payment === "Online"}
                    onChange={() => handlePaymentRadio("Online")}
                  />
                  {/* <label className="ml-1">Online</label> */}
                </div>
                <div>
                  <input
                    type="radio"
                    name="selectPayment"
                    value={"Wallet"}
                    checked={payment === "Wallet"}
                    onChange={() => handlePaymentRadio("Wallet")}
                  />
                  {/* <label className="ml-1">Wallet</label> */}
                </div>
              </div>
            </div>.
          </div> 
          <button className="ml-4 bg-teal-400 border-none" onClick={() => placeOrder(payment)}>
                  Place Order
                </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Checkout