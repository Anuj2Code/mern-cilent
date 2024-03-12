import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useLocation} from 'react-router-dom'
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  updateOrder
} from "../../actions/Order"
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_ORDER_RESET } from "../../constant/Order";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./processOrder.css";

const ProcessOrder = () => {
    const dispatch = useDispatch();
    const { orderDetail } = useSelector((state) => state.detail);
    const { isDeleted,isUpdated } = useSelector((state) => state.editOrder);
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    const updateOrderSubmitHandler = (e) => {
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("status", status);
      dispatch(updateOrder(id, myForm));
    };
  
    const [status, setStatus] = useState("");
  
    useEffect(() => {
      if (isUpdated) {
        toast.success("Order Updated Successfully");
        dispatch({ type: UPDATE_ORDER_RESET });
      }
      dispatch(getOrderDetails(id));
    }, [dispatch, id, isUpdated]);
  
  return (
    <>
         <ToastContainer />
    <div className="dashboard mt-[10px] bg-[#dddddd]" style={{minHeight:'120vh', overflow:'auto'}}>
        <SideBar />
        <div className="newProductContainer">
            <div
              className="confirmOrderPage"
              style={{
                display: orderDetail.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <h1 className="text-[150px] font-bold" style={{fontSize:'40px',fontWeight:'bold'}}>Shipping Info</h1>
                  <div className="orderDetailsContainerBox">
                    <div className="flex gap-2 p-[5px]">
                      <p className="text-[22x] font-semibold" style={{fontSize:'20px'}}>User ID</p>
                      <span className="text-[20px]">{orderDetail.user && orderDetail.user}</span>
                    </div>
                    <div className="flex gap-2 p-[5px]">
                      <p className="text-[20px] font-semibold">Phone:</p>
                      <span className="text-[20px]">
                        {orderDetail.shippingInfo && orderDetail.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div className="flex gap-2 p-[5px]">
                      <p className="text-[20px] font-semibold" >Address:</p>
                      <span className="text-[20px]">
                        {orderDetail.shippingInfo &&
                          `${orderDetail.shippingInfo.address}, ${orderDetail.shippingInfo.city}, ${orderDetail.shippingInfo.state}, ${orderDetail.shippingInfo.pinCode}, ${orderDetail.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <h1 className="text-[20px] font-semibold"style={{fontSize:'40px',fontWeight:'bold'}} >Payment</h1>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          orderDetail.paymentInfo &&
                          orderDetail.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {orderDetail.paymentInfo &&
                        orderDetail.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div className="flex gap-3 h-[80px]  items-center">
                      <p className="text-[20px] font-semibold">Amount:</p>
                      <span className="text-[20px]">{orderDetail.totalPrice && orderDetail.totalPrice}</span>
                    </div>
                  </div>

                  <h1 className="text-[20px] font-semibold" style={{fontSize:'40px',fontWeight:'bold'}}>Order Status</h1>
                  <div className="orderDetailsContainerBox">
                    <div className="h-[120px] flex items-center">
                      <p
                        className={
                          orderDetail.orderStatus && orderDetail.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {orderDetail.orderStatus && orderDetail.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems ">
                  <h1 className="text-[20px] font-semibold" style={{fontSize:'40px',fontWeight:'bold'}}>Your Cart Items:</h1>
                  <div className="confirmCartItemsContainer">
                    {orderDetail.orderItems &&
                      orderDetail.orderItems.map((item) => (
                        <div key={item.product} className="flex justify-between gap-4 p-[10px] mt-[10px]">
                          <img src={item.image} alt="Product" className="h-[200px] w-[200px]"/>
                          <Link to={`/product/${item.product}`}>
                            <h1>{item.name}</h1>
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: orderDetail.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {orderDetail.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {orderDetail.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <button
                    id="createProductBtn"
                    type="submit"
                  
                  >
                    Process
                  </button>
                </form>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default ProcessOrder
