import React, { useState } from "react";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveShippingInfo } from "../actions/Cart";
import tar from "../Componets/Images/tracking-delivery.jpg";
import CheckOutStepper from "./CheckOutStepper";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate()
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    Navigate('/order/confirm')
  };
  
  return (
    <>
   <div className="mt-[10px] "> <CheckOutStepper activeStep={0} /></div>
      <div className="flex h-[100vh] w-[100vw] max-[948px]:flex max-[948px]:flex-col max-[948px]:justify-center max-[948px]:items-center max-[980px]:h-[139vh] ">
        <div className="right h-[90%] w-[48%]">
          <img
            src={tar}
            alt=""
            className="mt-[10px]"
            style={{ height: "inherit" }}
          />
        </div>
        <ToastContainer />
        <div className="left w-[65%] flex justify-center items-center max-[948px]:h-[97%] max-[948px]:w-[92%]   ">
          <div className="h-[98%] w-[70%] border shadow-lg rounded-2xl flex flex-col [@media(max-width:1100px)]:w-[89%] max-[980px]:h-[96vh] max-[980px]:items-center max-[980px]:justify-center ">
            <h2 className="min-[950px]:text-[49px] w-[80%] min-[980px]:ml-[18px] text-center font-semibold h-[100px] min-[950px]:pt-[10px]  [@media(max-width:948px)]:text-[5vw]
            border-b-[3px] border-black
            ">
              Shipping Details
            </h2>
            <form
              className="flex flex-col items-center mt-[70px]"
              encType="multipart/form-data"
              onSubmit={shippingSubmit}
            >
              <div className="m-[9px]">
                <input
                  type="text"
                  placeholder="Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px] max-[948px]:w-[57vw]"
                />
              </div>

              <div className="m-[9px]">
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px] max-[948px]:w-[57vw]"
                />
              </div>
              <div className="m-[9px]">
                <input
                  type="number"
                  placeholder="Pin Code"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px] max-[948px]:w-[57vw]"
                />
              </div>

              <div className="m-[9px]">
                <input
                  type="number"
                  placeholder="Phone Number"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px] max-[948px]:w-[57vw]"
                  size="10"
                />
              </div>
              <div className="m-[9px]">
                <select
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px] max-[948px]:w-[57vw]"
                >
                  <option value="">Country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              {country && (
                <div className="m-[9px]">
                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px] max-[948px]:w-[57vw]"
                  >
                    <option
                      value=""
                      className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px] max-[948px]:w-[57vw]"
                    >
                      State
                    </option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
              <div className="w-[100%] justify-center flex max-[948px]:relative max-[948px]:top-[40px]">
                <button
                  type="submit"
                  className="min-[950px]:h-[50px] min-[950px]:w-[300px] bg-black text-white rounded-3xl min-[950px]:mt-[25px] max-[948px]:w-[33vw] max-[948px]:h-[39px]"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
