import React from 'react'
import logo from '../Componets/Images/shop.png';
import instagram from '../Componets/Images/modern-badge-logo-instagram-icon_578229-124.avif'
import what from '../Componets/Images/download.jpg'
import pin from '../Componets/Images/2fb909b74a854f0715e64dda5825990d.jpg'

const Footer = () => {
  return (
    <div className='w-[100vw] md:h-[100vh] bg-black flex  items-center flex-col shadow-xl max-[808px]:h-[120vh]'>
    <p className='uppercase text-[#ff0072] text-4xl font-bold mt-5 max-[850px]:text-[4vw]'>get exclusive offer on your e-mail</p>
    <p className=' uppercase text-[#f05193] text-2xl font-semibold mt-5 max-[850px]:text-[4vw]'>subscribe to our news letter</p>
  <input type="email" className='w-[45%]  max-[552px]:w-[65vw] md:min-h-[45px] text-center mt-5 bg-[#3f3f5c] text-white' placeholder='Please Enter your E-mail ....' />
  <div className="bt flex justify-center items-center pt-[50px] gap-4 max-[450px]:pr-[5px]">
    <img src={logo} alt="" className='h-[40%] w-[75%] max-[450px]:hidden'/>
    <p className='text-[#ff0072] text-4xl font-semibold'>SHOPPER</p>
  </div>
  <div className="br text-[#808b99] flex text-xl gap-4 mt-1 max-[449px]:flex-col">
    <div className="hover:text-[#4087b0] hover:decoration-solid hover:underline"><a href="#">Company</a></div>
    <div className="hover:text-[#4087b0] hover:decoration-solid hover:underline"><a href="#">Product</a></div>
    <div className="hover:text-[#4087b0] hover:decoration-solid hover:underline"><a href="#">Office</a></div>
    <div className="hover:text-[#4087b0] hover:decoration-solid hover:underline"><a href="#">About</a></div>
    <div className="hover:text-[#4087b0] hover:decoration-solid hover:underline"><a href="#">Contact</a></div>
  </div>
  <div className="2 flex gap-4 mt-8">
    <div className=""><a href=""><img src={instagram} alt=""  className='h-[25px]'/></a></div>
    <div className=""><a href=""><img src={pin} alt="" className='h-[25px]'/></a></div>
    <div className=""><a href=""><img src={what} alt="" className='h-[25px]' /></a></div>
  </div>
  <div className="3 text-white mt-12 text-xl">
    <p className='max-[850px]:text-[4vw]'>Copyright @ 2023 - All right are reserved</p>
  </div>
  </div>
  )
}

export default Footer
