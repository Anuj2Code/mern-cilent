
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myOrder} from "../actions/Order";
import { Link } from "react-router-dom";

const MyOrder = (props) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  let  id  = '';
  if(user){
    id = user.data._id
  }
  else{
    id=null
  }

  const {orders} = useSelector((state) => state.myOrder);
  useEffect(() => {
    dispatch(myOrder(id));
    props.setPr(45);
    const time = setTimeout(()=>{
     props.setPr(100);
    },300)
    return ()=>{clearTimeout(time)}
  }, [dispatch]);

  return (
    <>
    {user && orders ? <div className="min-h-[100vh] flex flex-col">
        <table className=" ml-[100px]">
                <tr className="h-[100px]">
                    <td className="text-[25px] font-serif font-bold">Order Id</td>
                    <td className="text-[25px] font-serif font-bold">Status</td>
                    <td className="text-[25px] font-serif font-bold">Amount</td>
                    <td className="text-[25px] font-serif font-bold">View </td>
                </tr>
                {orders.data && orders.data.map((order)=>{
                  return (
                    <tr className="h-[50px]">
                    <td className="text-[18px]">{order._id}</td>
                    <td className="text-[18px]">{order.orderStatus}</td>
                    <td className="text-[18px]">{order.totalPrice}</td>
                    <Link to={`/order/${order._id}`}><td><button className="text-[20px] font-semibold hover:underline hover:text-red-400">click here</button></td></Link>
                </tr>
                  )
                })}
            </table>
      </div>:(
        <div className="h-[85vh] flex flex-col justify-center items-center  backdrop-blur-xl">
       <h1 className="text-[50px] drop-shadow-md font-[static]">Please Login/Register to continue</h1>
       <Link to={'/login'}>
       <button type='submit'  className='min-[950px]:h-[50px] min-[950px]:w-[300px] bg-black text-white rounded-3xl min-[950px]:mt-[25px] max-[948px]:w-[33vw] max-[948px]:h-[39px]' >Register</button>
       </Link>
        </div>
      )}
    </>
  );
};

export default MyOrder;
