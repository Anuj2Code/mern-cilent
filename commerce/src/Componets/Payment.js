import React, { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import {CreateOr} from '../actions/Order'

const Payment = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const payBtn = useRef(null);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const user = JSON.parse(localStorage.getItem("user"));
  let  id  = '';
  if(user){
    id = user.data._id
  }
  else{
    id=null
  }
  const stripe = useStripe();
  const elements = useElements();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const {error} = useSelector((state)=> state. newOrder)
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.rate,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.total,
  };
  const paymentData = {
    amount: Math.round(orderInfo.total * 100),
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://mern-api-ujke.onrender.com/api/payment/payment/process",
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      console.log(client_secret);
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.data.username,
            email: user.data.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } 
      else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          console.log(order);
          dispatch(CreateOr(order,id))
          Navigate("/success");
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="mt-[1px] bg-red-200 z-0 h-[0px]">
        {" "}
      </div>
      <div className="h-[100vh] flex justify-center items-center  ">
        <form action="" className="" onSubmit={(e) => submitHandler(e)}>
          <h1 className="text-[45px] font-bold drop-shadow min-[980px]:h-[130px] text-center">
            Card Info
          </h1>
        <div className="ml-[35px]">
        <div className="flex mb-[30px] gap-4 ml-[10px]">
            <CardNumberElement className="paymentInput w-[225px] p-[10px] h-[35px] bg-red-300 rounded-lg" />
          </div>
          <div className="flex mb-[30px] gap-4 ml-[10px] ">
            <CardExpiryElement className="paymentInput w-[225px] p-[10px] h-[35px] bg-red-300 rounded-lg" />
          </div>
          <div className="flex  mb-[30px] gap-4 ml-[10px]">
            <CardCvcElement className="paymentInput w-[225px] p-[10px] h-[35px] bg-red-300 rounded-lg" />
          </div>
        </div>
          <input
            type="submit"
            className="min-[950px]:h-[50px] min-[950px]:ml-[12px] min-[950px]:w-[300px] bg-black text-white rounded-3xl min-[950px]:mt-[25px] max-[948px]:w-[33vw] max-[948px]:h-[39px]"
            value={`Pay   ₹ ${orderInfo && orderInfo.total}`}
            ref={payBtn}
          />
        </form>
      </div>
    </>
  );
};

export default Payment;

