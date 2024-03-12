import React,{useEffect, useState} from 'react'
import {  Routes, Route,useLocation } from "react-router-dom";
import Home from './Componets/Home'
import ItemPiece from './Componets/ItemPiece'
import Products from './Componets/Products';
import SignUp from './Componets/SignUp';
import './App.css';
import Profile from './Componets/Profile';
import Login from './Componets/Login';
import Cart from './Componets/Cart';
import UpdateProfile from './Componets/UpdateProfile';
import UpdatePassword from './Componets/UpdatePassword';
import CheckOut from './Componets/CheckOut';
import ConfirmOrder from './Componets/ConfirmOrder';
import Payment from './Componets/Payment';
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './Componets/OrderSuccess';
import OrderDetails from './Componets/OrderDetails';
import Dashboard from './Componets/Dashboard.js/Dashboard';
import NewProduct from './Componets/Dashboard.js/NewProduct';
import UpdateProduct from './Componets/Dashboard.js/UpdateProduct';
import ProcessOrder from './Componets/Dashboard.js/ProcessOrder';
import UpdateUser from './Componets/Dashboard.js/UpdateUser';
import { AnimatePresence } from 'framer-motion';
import LoadingBar from 'react-top-loading-bar'
import Contact from './Componets/Contact';
import NewCol from './Componets/NewCol';
import About from './Componets/About';
import MyOrder from './Componets/MyOrder';

const AnimatedRoute = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [stripeKey,setStripeKey] = useState("")
    const location = useLocation();
     const getStripeApiKey = async()=> {
      const { data } = await axios.get("https://mern-api-ujke.onrender.com/api/payment/key");
      setStripeKey(data.stripeApiKey);
    }
    useEffect(()=>{
      getStripeApiKey()
    },[])
    console.log(stripeKey);
    const [progress, setProgress] = useState(0)

    const setPr = (progress)=>{
         setProgress(progress);   
    }
  return (
    <>
    <LoadingBar
       height={5}
       shadow={true}
        color='#f11946'
        progress={progress}
      />
    <AnimatePresence mode='wait'>
    <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/myorder' element={<MyOrder setPr={setPr}/>}></Route>
        <Route path='/about' element={<About setPr={setPr}/>}></Route>
        <Route path='/new' element={<NewCol setPr={setPr}/>}></Route>
        <Route path='/contact' element={<Contact setPr={setPr}/>}></Route>
        <Route path='/product/:id' element={<ItemPiece setPr={setPr}/>}></Route>
        <Route path='/products' element={<Products setPr={setPr}/>}></Route>
        <Route path='/products/:keyword' element={<Products setPr={setPr}/>}></Route>
        <Route path='/log' element={<Login setPr={setPr}/>}></Route>
        <Route path='/profile' element={<Profile setPr={setPr}/>}></Route>
        <Route path='/edit' element={<UpdateProfile setPr={setPr}/>}></Route>
        <Route path='/order/id' element={<OrderDetails setPr={setPr}/>}></Route>
        <Route path='/login' element={<SignUp setPr={setPr}/>}></Route>
        <Route path='/cart' element={<Cart setPr={setPr}/>}></Route>
        <Route path='/updatePassword' element={<UpdatePassword setPr={setPr}/>}></Route>
        <Route path='/checkout' element={<CheckOut setPr={setPr}/>}></Route>
        <Route path='/order/confirm' element={<ConfirmOrder/>}></Route>
        <Route path='/success' element={<OrderSuccess setPr={setPr}/>}></Route>
        <Route path='/order/:id' element={<OrderDetails setPr={setPr}/>}></Route>
        <Route path='/admin/dashboard' element={<Dashboard/>}></Route>
        <Route path='/admin/product/:id' element={<UpdateProduct/>}></Route>
        <Route path='/admin/product' element={<NewProduct/>}></Route>
        <Route path='/admin/order/:id' element={<ProcessOrder/>}></Route>
        <Route path='/admin/user/:id' element={<UpdateUser/>}></Route>
        <Route path='/process/payment' element={stripeKey && (
         <Elements stripe={loadStripe(stripeKey)}><Payment/></Elements>
      )}></Route>
      </Routes>
    </AnimatePresence>
    </>
  )
}

export default AnimatedRoute

