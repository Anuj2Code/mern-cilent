import React,{useEffect} from 'react'
import cart from '../Componets/Images/orderSaved.avif'
import { Link } from 'react-router-dom'
import {orderEmail} from '../actions/Order'
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderSuccess = () => {
const user =JSON.parse(localStorage.getItem('user'));
const dispatch = useDispatch();
const {message} = useSelector((state)=> state.email)
let email = '';
if(user){
  email = user.data.email
}else{
   email=null
}
  useEffect(()=>{
    dispatch(orderEmail(email))
    if(message && message.success===true){
      toast.success(message.message)
    }
  },[dispatch,email])
  return (
   <>
    <ToastContainer />
    <div className="h-[100vh] flex justify-center">
    <div>
      <img src={cart} alt="" className="mt-[35px] min-[980px]:h-[450px]"/>
      <div>
        <div className="flex justify-center flex-col">
            <h1 className='text-[30px] font-semibold'>Your Order is Successfully placed </h1>
         <Link to={'/myOrder'}>
         <button
            type="text"
            className="ml-[70px] min-[950px]:h-[50px] min-[950px]:w-[300px] bg-black text-white rounded-3xl min-[950px]:mt-[25px] max-[948px]:w-[33vw] max-[948px]:h-[39px]"
          >
           view Order
          </button>
         </Link>
        </div>
      </div>
    </div>
  </div>
   </>
  )
}

export default OrderSuccess
