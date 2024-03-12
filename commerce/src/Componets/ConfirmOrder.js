import React from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ConfirmOrder = ({activeStep}) => {
    const navigate = useNavigate()
    const user= JSON.parse(localStorage.getItem('user'));
 const {shippingInfo,cartItems} = useSelector((state)=> state.cart)
 let quan = 0;
  let rate = 0;
const shippingCharges =20;
  for (let i = 0; i < cartItems.length; i++) {
    quan += Number(cartItems[i].quantity);
    rate += Number(cartItems[i].price * cartItems[i].quantity);
  }
  const total = rate+shippingCharges;
  const proceedToPayment = () => {
    const data = {
      rate,
      shippingCharges,
        total
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };
  return (
   <>
    <div className='h-[90vh] flex justify-evenly '>
      <div className='w-[40%]  flex flex-col justify-center  gap-3 h-[90%] mt-[15px]'>
         <h1 className='text-[50px] pb-[10px] w-[60%] border-b-4 uppercase'>Shipping Info</h1>
         <div className='text-[25px] pt-4 '>
           <span className='font-semibold uppercase'> Name</span> : <span className='ml-[20px]'>{user.data.username}</span>
         </div>
         <div className='text-[25px] '>
            <span className='font-semibold uppercase'>phone</span> : <span className='ml-[20px]'>{shippingInfo.phoneNo}</span>
         </div>
         <div className='text-[25px] '>
           <span className='font-semibold uppercase'> Address </span>: <span className='ml-[20px]'>{shippingInfo.address}</span>
         </div>
         <div className='text-[25px] '>
            <span className='font-semibold uppercase'>Country-Code</span> : <span className='ml-[20px]'>{shippingInfo.country}</span>
         </div>
         <div className='text-[25px] '>
            <span className='font-semibold uppercase'>State-code</span> : <span className='ml-[20px]'>{shippingInfo.state}</span>
         </div>
         <div className='text-[25px] '>
            <span className='font-semibold uppercase'>Pin-Code</span> : <span className='ml-[20px]'>{shippingInfo.pinCode}</span>
         </div>
      </div>
      <div className="second  h-[400px] w-[350px] mt-[150px] flex flex-col items-center justify-center shadow-lg">
            <h1 className="w-[80%] ml-8 mr-2 border-b-2 h-[50px] text-center text-[30px] mt-1  drop-shadow-md">
              Order Summary
            </h1>
            <div className="flex w-[80%] flex-col h-[50%] justify-center border-b-4 gap-3">
              <div className="flex justify-between ml-[10px] mr-[10px]">
                <div className="text-slate-500 text-[20px] ">
                  Total Quantity{" "}
                </div>
                <div className="text-[20px]">
                  <span className="text-red-500">{quan}</span>
                </div>
              </div>
              <div className="flex justify-between ml-[10px] mr-[10px]">
                <div className="text-slate-500 text-[20px] ">Price </div>
                <div className="text-[20px]">
                  ₹ <span className="text-red-500">{rate}</span>
                </div>
              </div>
              <div className="flex justify-between ml-[10px] mr-[10px]">
                <div className="text-slate-500 text-[20px] ">
                  Delivery Charge{" "}
                </div>
                <div className="text-[20px]">
                  ₹ <span className="text-red-500">20</span>
                </div>
              </div>
              <div className="flex justify-between ml-[10px] mr-[10px]">
                <div className="text-slate-500  font-bold text-[20px]">
                  Total Charge{" "}
                </div>
                <div className="text-[20px]">
                  ₹ <span className="font-bold">{rate + 20}</span>
                </div>
              </div>
            </div>
            <div className="w-[100%] flex justify-center mt-[25px]">
              <button className="w-[90%] h-[50px] bg-black rounded-lg text-white" onClick={()=> proceedToPayment()} >
                Proceed To Payment
              </button>
            </div>
          </div>   
    </div>
   </>
  )
}

export default ConfirmOrder
