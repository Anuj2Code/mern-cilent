import React,{useEffect, useState} from 'react'
import Navbar from './Componets/Navbar'
import Footer from './Componets/Footer'
// import Home from './Componets/Home'
import { BrowserRouter , Routes, Route } from "react-router-dom";
// import ItemPiece from './Componets/ItemPiece'
// import Products from './Componets/Products';
// import SignUp from './Componets/SignUp';
import './App.css';
// import Profile from './Componets/Profile';
// import Login from './Componets/Login';
// import Cart from './Componets/Cart';
// import UpdateProfile from './Componets/UpdateProfile';
// import UpdatePassword from './Componets/UpdatePassword';
// import CheckOut from './Componets/CheckOut';
// import ConfirmOrder from './Componets/ConfirmOrder';
// import Payment from './Componets/Payment';
import axios from 'axios';
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import OrderSuccess from './Componets/OrderSuccess';
// import MyOrder from './Componets/MyOrder';
// import OrderDetails from './Componets/OrderDetails';
import Shery from "sheryjs";
// import Dashboard from './Componets/Dashboard.js/Dashboard';
// import ProductsList from './Componets/Dashboard.js/ProductsList';
// import NewProduct from './Componets/Dashboard.js/NewProduct';
// import UpdateProduct from './Componets/Dashboard.js/UpdateProduct';
// import OrderList from './Componets/Dashboard.js/OrderList';
// import ProcessOrder from './Componets/Dashboard.js/ProcessOrder';
// import UserList from './Componets/Dashboard.js/UserList';
// import UpdateUser from './Componets/Dashboard.js/UpdateUser';
import AnimatedRoute from './AnimatedRoute';

const App = () => {
  { 
    Shery.mouseFollower({
      skew: true,
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 1,
    });
    Shery.makeMagnet('.mag')
  
   Shery.hoverWithMediaCircle(".tar" , {
      images: ["https://t4.ftcdn.net/jpg/01/05/98/75/360_F_105987560_Xrjx31sbxgSj1ae4WiL7Vg0tM9PEihY6.jpg"]
    });
   }
  const user = JSON.parse(localStorage.getItem('user'));
  const [stripeKey,setStripeKey] = useState("")

   const getStripeApiKey = async()=> {
    const { data } = await axios.get("http://localhost:8800/api/payment/key");
    setStripeKey(data.stripeApiKey);
  }
  useEffect(()=>{
    getStripeApiKey()
  },[])
  console.log(stripeKey);
  return <>
      <BrowserRouter>
      <Navbar/>
      <AnimatedRoute/>
      {/* <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/product/:id' element={<ItemPiece/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/products/:keyword' element={<Products/>}></Route>
        <Route path='/log' element={<Login/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/edit' element={<UpdateProfile/>}></Route>
        <Route path='/login' element={<SignUp/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/updatePassword' element={<UpdatePassword/>}></Route>
        <Route path='/checkout' element={<CheckOut/>}></Route>
        <Route path='/order/confirm' element={<ConfirmOrder/>}></Route>
        <Route path='/success' element={<OrderSuccess/>}></Route>
        <Route path='/myOrder' element={<MyOrder/>}></Route>
        <Route path='/order/:id' element={<OrderDetails/>}></Route>
        <Route path='/admin/dashboard' element={<Dashboard/>}></Route>
        <Route path='/admin/products' element={<ProductsList/>}></Route>
        <Route path='/admin/product/:id' element={<UpdateProduct/>}></Route>
        <Route path='/admin/product' element={<NewProduct/>}></Route>
        <Route path='/admin/order/:id' element={<ProcessOrder/>}></Route>
        <Route path='/admin/orders' element={<OrderList/>}></Route>
        <Route path='/admin/user/:id' element={<UpdateUser/>}></Route>
        <Route path='/admin/users' element={<UserList/>}></Route>
        <Route path='/process/payment' element={stripeKey && (
         <Elements stripe={loadStripe(stripeKey)}><Payment/></Elements>
      )}></Route>
      </Routes> */}
      </BrowserRouter>
     <Footer/>
  </>
}
export default App
