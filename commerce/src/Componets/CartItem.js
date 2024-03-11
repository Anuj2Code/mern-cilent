import React from "react";
import bin from '../Componets/Images/trash-bin-icon.png'
import { Link } from "react-router-dom";

const CartItem = ({item,deleteCartItems}) => {
  return (
    <>
     <div className="flex  ">
     <Link to={`/product/${item.product}`}>
     <div className="w-[150px]">
        <img src={item.image}  className="w-[150px] h-[198px] max-[1055px]:h-[153px] max-[1055px]:w-[120px]" />
      </div>
      </Link>
      <div className=" w-[45%] min-[851px]:h-[200px] flex flex-col justify-center gap-6 items-center max-[1055px]:gap-[2px]  ">
        <h1 className="uppercase text-[2vw] max-[1055px]:text-[15px] ">{item.name}</h1>
        <h1 className="text-[20px] max-[1055px]:text-[13px]">Price : ₹ {item.price}</h1>
        <h1 className="text-[20px] max-[1055px]:text-[13px]">Quantity : {item.quantity}</h1>
      </div>
      <div className="ml-[30px]">
        <img src={bin} alt="" className="w-[60px] min-[850px]:mt-[60px] max-[1055px]:mt-[50px] max-[1055px]:w-[90px] max-[1055px]:h-[50px] " onClick={()=> deleteCartItems(item.product)} />
      </div>
     </div>
    </>
  );
};

export default CartItem;
