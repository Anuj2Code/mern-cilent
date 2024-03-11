import React, { useEffect } from "react";
import ik from './Images/modern-badge-logo-instagram-icon_578229-124.avif'

const About = (props) => {
    useEffect(()=>{
        props.setPr(45);
        const time = setTimeout(()=>{
         props.setPr(100);
        },300)
        return ()=>{clearTimeout(time)}
    },[])
  return (
    <>
      <div className="h-[100vh] flex max-[830px]:flex-col max-[830px]:justify-center max-[830px]:items-center max-[830px]:h-[140vh]">
          <div className="flex w-[50%] flex-col justify-center items-center h-[100%] ">
             <div>
                <img src="" alt="" />
             </div>
             <div className="h-[70%] flex flex-col items-center justify-center gap-12">
                <p className="text-[30px]  font-serif ml-[40px] max-[830px]:w-[134%] max-[830px]:mt-[56px]"style={{ fontFamily: "Satisfy" }} >
              Hi Everybody My Name is Anuj and these is my First web Dev Project
              which I 
              Build using following tech stack
              </p>
              <ul className="text-[20px] uppercase font-mono p-[15px]">
                <li className="p-[15px]">Mongo DB  as a Database</li>
                <li className="p-[15px]">Express as a Server</li>
                <li className="p-[15px]">Node js as a javascript Web server</li>
                <li className="p-[15px]">React as Frontend Javascript library </li>
                </ul> 
                
             </div>
          </div>
          <div className="w-[50%]  h-[100%] flex flex-col justify-center items-center gap-3">
              <div className="">
                  <img src={ik} alt="" className="h-[102px]"/>
              </div>
              <div>
                <a href="https://www.instagram.com/anujpal1079/" >
                    <button className="h-[40px] text-white bg-black w-[200px] rounded-2xl"> Follow on Instagram</button>
                </a>
              </div>
          </div>
      </div>
    </>
  );
};

export default About;
