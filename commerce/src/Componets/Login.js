import React, { useState, useEffect } from "react";
import svg from "./Images/6333040.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/User";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticate, user } = useSelector((state) => state.login);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    if(isAuthenticate){
      toast.success('successfull Login')
      setTimeout(()=>{
        navigate('/profile')
      },3000)
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    props.setPr(45);
    const time = setTimeout(()=>{
     props.setPr(100);
    },300)
    return ()=>{clearTimeout(time)}
  }, [error, navigate]);

  return (
    <>
      <div className="flex h-[100vh] w-[100vw] max-[948px]:flex max-[948px]:flex-col max-[948px]:justify-center max-[948px]:items-center">
        <div className="right h-[96%] w-[50%] max-[948px]:hidden">
          <img
            src={svg}
            alt=""
            className="mt-[10px]"
            style={{ height: "inherit" }}
          />
        </div>
        <div className="left w-[50%] flex justify-center items-center max-[948px]:h-[97%] max-[948px]:w-[92%]">
          <div className=" h-[98%] w-[70%] border shadow-lg rounded-2xl flex flex-col [@media(max-width:1100px)]:w-[89%] ">
            <h1 className="min-[950px]:text-[49px] w-[100%] text-center font-semibold h-[100px] min-[950px]:pt-[10px] max-[948px]:relative max-[948px]:top-[150px]  [@media(max-width:948px)]:text-[5vw] mt-[55px]">
              Sign In
            </h1>
            <ToastContainer />
            <div className="flex justify-center items-center  h-[90%] min-[950px]:mt-[12px] ">
              <form action="" onSubmit={loginSubmit}>
                <div>
                  <h1 className="text-[25px] mb-[15px] max-[948px]:text-center">
                    E-mail
                  </h1>
                  <input
                    type="email"
                    placeholder="Enter the E-mail address ..."
                    id="email"
                    className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px] max-[948px]:w-[57vw]"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="max-[948px]:mt-[50px]">
                  <h1 className="text-[25px] mb-[15px] max-[948px]:text-center">
                    Password
                  </h1>
                  <input
                    type="text"
                    placeholder="Enter the 6 + Character ..."
                    id="password"
                    className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px] max-[948px]:w-[57vw]"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="h-[30px]  w-[100%] text-center text-[23px] ">
                  {/* <span>{error}</span> */}
                </div>
                <div className="w-[100%] justify-center flex max-[948px]:relative max-[948px]:top-[40px]">
                  <button
                    type="submit"
                    className="min-[950px]:h-[50px] min-[950px]:w-[300px] bg-black text-white rounded-3xl min-[950px]:mt-[25px] max-[948px]:w-[33vw] max-[948px]:h-[39px]"
                  >
                    Login{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
