import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/Order";
import { useLocation } from "react-router-dom";

const OrderDetails = (props) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const { orderDetail } = useSelector((state) => state.detail);
  // const {}
  // const orderDetail = JSON.parse(localStorage.getItem('det'))
  const {orders} = useSelector((state) => state.myOrder);
  console.log(orderDetail);

  useEffect(() => {
    dispatch(getOrderDetails(id));
    props.setPr(45);
    const time = setTimeout(()=>{
     props.setPr(100);
    },300)
    return ()=>{clearTimeout(time)}
  }, [id]);

  return (
    <>
        {user ? (<div className="min-[841px]:h-[120vh] w-[100vw] max-[840px]:h-[210vh] max-[1001px]:h-[140vh] ">
          <div className="h-[100%] w-[100%] flex justify-around max-[840px]:flex-col max-[840px]:justify-center max-[840px]:items-center">
            <div className="w-[50%] h-[100%] flex flex-col gap-[12vh] pt-[30px] ">
              <h1 className="text-[42px] text-center font-semibold font-mono">
                Order Confirmation
              </h1>
              <p
                style={{ fontFamily: "Satisfy" }} 
                className="text-center text-[33px]"
              >
                Hello user ,thanks for choosing us .Your Order has been
                recieved,we will notify you when it will be on its way to you .
              </p>
              <div className="flex flex-col justify-center max-[840px]:items-center ">
                <h1 className="border-b-4 w-[45%] text-center border-slate-300 text-gray-500 text-[30px] mb-[15px] max-[840px]:w-[55%]">
                  Delivery Details
                </h1>
                <div className="gap-[15px] flex flex-col">
                  <h1 className="text-[25px] font-semibold mt-[10px] mb-[10px]">Delivery Address</h1>
                  <h1 className="text-[20px]"><span className="font-semibold">Name :</span> {user.data.username}</h1>
                  <h1 className="text-[20px]"><span className="font-semibold">Address :</span> {orderDetail.shippingInfo && orderDetail.shippingInfo.address}</h1>
                  <h1 className="text-[20px]"><span className="font-semibold">Phone no :</span> + 91 {orderDetail.shippingInfo && orderDetail.shippingInfo.phoneNo}</h1>
                  <h1 className="text-[20px]"><span className="font-semibold">PinCode :</span> {orderDetail.shippingInfo && orderDetail.shippingInfo.pinCode}</h1>
                </div>
                <div>
                  <h1 className="border-b-4 w-[45%] text-center border-slate-300 text-gray-500 text-[30px] mt-[30px] max-[840px]:w-[100%]">
                    Payment Method
                  </h1>
                  <h1 className="text-[25px] font-semibold mt-[20px]">Card Payment</h1>
                </div>
              </div>
            </div>
            <div className="w-[40%] h-[100%] overflow-y-scroll pt-[15px]  border shadow-lg rounded-2xl">
              <h1 className="text-[42px] text-center font-semibold font-mono">Order Recap</h1>
              <div className="flex justify-around pt-[20px] mt-[15px]">
                <h1 className="text-[20px] font-semibold ml-[32px]">Order ID </h1>
                <h1>{orderDetail._id}</h1>
              </div>
              <div className="flex justify-around pt-[20px] ">
                <h1 className="text-[20px] font-semibold ">Order Date</h1>
                <h1>{String(orderDetail.createdAt).substring(0, 10)}</h1>
              </div>
              <div>
              {orderDetail.orderItems &&
               orderDetail.orderItems.map((item) => {
                  return (
                    <div className="flex justify-around mt-[20px] pt-[15px]">
                      <div>
                        <img src={item.image} alt="" className="w-[150px] h-[180px] " />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h1>{item.name}</h1>
                        <h1>Price {item.price}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
                <div className="flex justify-around pt-[20px] mt-[75px]">
                  <h1 className="text-[24px] font-semibold">SubTotal</h1>
                  <h1>{ orderDetail.itemsPrice && orderDetail.itemsPrice}</h1>
                </div>
                <div className="flex justify-around pt-[20px] mt-[15px">
                  <h1 className="text-[24px] font-semibold">Delivery</h1>
                  <h1>20</h1>
                </div>
                <div className="flex justify-around pt-[20px] mt-[15px">
                  <h1 className="text-[24px] font-semibold">Total</h1>
                   <h1 className="ml-[35px]">{orderDetail.totalPrice && orderDetail.totalPrice}</h1>
                </div>
            </div>
          </div>
        </div>):(
          <div>
            please Log/Register 
          </div>
        )}
    </>
  );
};

export default OrderDetails;
