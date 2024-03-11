import React, { useState ,useEffect} from "react";
import Product from "./Product";
import axios from 'axios';

const NewCol = (props) => {
    const cat = "New"
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
          props.setPr(45);
          const time = setTimeout(()=>{
           props.setPr(100);
          },300)
          return ()=>{clearTimeout(time)}
         },[]);
  return (
    <>
        <h1 className="w-[100%] relative text-center text-[55px] font-serif top-[10px] h-[100px]">New Arrival</h1>
        <div className='mt-[50px] min-h-[140vh] flex flex-wrap justify-center gap-y-4  '>
        {data &&
          data.map((product) => {
            return <Product product={product} />;
          })}
        </div>
    </>
  )
}

export default NewCol
