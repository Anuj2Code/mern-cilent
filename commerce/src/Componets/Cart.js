import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../actions/Cart";
import cart from "../Componets/Images/cart1 - Copy.avif";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const { cartItems } = useSelector((state) => state.cart);
  let quan = 0;
  let rate = 0;

  for (let i = 0; i < cartItems.length; i++) {
    quan += Number(cartItems[i].quantity);
    rate += Number(cartItems[i].price * cartItems[i].quantity);
  }

  const deleteCartItems = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOut = ()=>{
    if(user){
      navigate("/checkout")
    }
    else{
      navigate('/log')
    }
  }
  useEffect(()=>{
    props.setPr(45);
    const time = setTimeout(()=>{
     props.setPr(100);
    },300)
    return ()=>{clearTimeout(time)}
  },[])
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="h-[100vh] flex justify-center">
          <div>
            <img src={cart} alt="" className="ml-[25px]"/>
            <div>
              <h1 className="text-[45px] text-wrap text-center">Your Cart is Currently empty !</h1>
              <div className="flex justify-center">
               <Link to={'/products'}>
               <button
                  type="text"
                  className="min-[950px]:h-[50px] min-[950px]:w-[300px] bg-black text-white rounded-3xl min-[950px]:mt-[25px] max-[948px]:w-[33vw] max-[948px]:h-[39px] max-[800px]:mt-[35px] max-[450px]:w-[150px]"
                >
                  Go To Products
                </button>
               </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[100vh] flex min-[951px]:gap-12 max-[950px]:flex-col max-[950px]:justify-center max-[950px]:items-center mb-[15px]">
          <div className="first  h-[85%] w-[55%] min-[948px]:ml-[80px] mt-14 shadow-lg rounded-2xl max-[850px]:w-[450px]">
            <h1 className="w-[100%] text-center text-[2.8vw] mb-[25px] border-b-4 h-[80px] uppercase mt-3 font-semibold drop-shadow-md max-[653px]:text-[6vw]">
              Your Cart{" "}
            </h1>
            <div className="flex flex-col mb-[25px] gap-4 items-center">
              {cartItems &&
                cartItems.map((item) => {
                  return (
                    <div className="flex w-[50%] h-[200px] border  hover:scale-105 duration-[1000ms] max-[1055px]:h-[155px] max-[1055px]:w-[340px]">
                      <CartItem item={item} deleteCartItems={deleteCartItems} />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="second  h-[400px] w-[350px] mt-[150px] hover:scale-105 duration-[1000ms] shadow-lg max-[950px]:mb-[15px]">
            <h1 className="w-[80%] ml-8 mr-2 border-b-2 h-[50px] text-center text-[30px] mt-1 font-semibold drop-shadow-md">
              Price Details
            </h1>
            <div className="flex flex-col h-[50%] justify-center border-b-4 gap-3">
              <div className="flex justify-between ml-[10px] mr-[10px]">
                <div className="text-slate-500 text-[20px] font-semibold">
                  Total Quantity{" "}
                </div>
                <div className="text-[20px]">
                  <span className="text-red-500">{quan}</span>
                </div>
              </div>
              <div className="flex justify-between ml-[10px] mr-[10px]">
                <div className="text-slate-500 text-[20px] font-semibold">Price </div>
                <div className="text-[20px]">
                  ₹ <span className="text-red-500">{rate}</span>
                </div>
              </div>
              <div className="flex justify-between ml-[10px] mr-[10px]">
                <div className="text-slate-500 text-[20px] font-semibold">
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
              <button className="w-[90%] h-[50px] bg-black rounded-lg text-white " onClick={()=> checkOut()}>
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
