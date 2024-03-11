import React,{useState,useEffect} from 'react'
import Product from "./Product";
import axios from 'axios';

const Clothes = () => {
  const cat = "Snacks"
 const [data,setData] = useState([])


  useEffect(()=>{ 
  const fetchData =async()=>{
    try {
        let info = await axios.get(`https://mern-api-ujke.onrender.com/api/item/filter?category=${cat}`);
        setData(info.data);
    } catch (error) {
        console.log(error);
    }
  }
  fetchData()
   },[]);
  return (
    <div className=" min-h-[160vh] flex flex-wrap justify-center gap-y-4  ">
    {data &&
      data.map((product) => {
        return <Product product={product} />;
      })}
  </div>
  )
}

export default Clothes
