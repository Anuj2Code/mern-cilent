import { useEffect } from "react"
import React from 'react'

const Contact = (props) => {
  useEffect(()=>{
    props.setPr(45);
    const time = setTimeout(()=>{
     props.setPr(100);
    },300)
    return ()=>{clearTimeout(time)}
},[])
  return (
    <div className='h-[100vh] flex justify-center items-center bg-black flex-col'>
        <a href="mailto:tanujpal2004@gmail.com">
        <div className='font-[static] text-[45px] font-bold text-white max-[653px]:text-[6vw]'>click here</div>
        </a>
      <a href="mailto:tanujpal2004@gmail.com">
      <p  className='font-[static] text-[45px] font-bold text-white max-[653px]:text-[6vw]' >Contact: tanujpal2004@gmail.com</p>
      </a>
    </div>
  )
}

export default Contact
