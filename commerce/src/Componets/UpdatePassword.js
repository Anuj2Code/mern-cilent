import React,{useState, useEffect} from "react";
import svg from "./Images/6333040.jpg";
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import {updatePassword} from '../actions/User'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {UPDATE_PASSWORD_RESET}  from "../constant/User";

const UpdatePassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user1 = JSON.parse(localStorage.getItem('user'));
  const id = user1.data._id;
  const { error,isUpdated,loading} = useSelector((state)=> state.edit);

   const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword",oldPassword );
    myForm.set("newPassword",newPassword);
    myForm.set("confirmPassword",confirmPassword)
    dispatch(updatePassword(myForm,id));
  };

   useEffect(()=>{
     if(error){
      toast.error(error)
     }
   
     if(isUpdated){
      toast.success('Password is Updated successfully');
      setTimeout(()=>{
        navigate('/profile')
      },3000)
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
     }

   },[error,navigate,dispatch,isUpdated])
   
  return (
    <>
    <div className="flex h-[100vh] w-[100vw]">
      <div className="right h-[96%] w-[50%]">
        <img
          src={svg}
          alt=""
          className="mt-[10px]"
          style={{ height: "inherit" }}
        />
      </div>
      <div className="left w-[50%] flex justify-center items-center ">
        <div className=" h-[98%] w-[70%] border shadow-lg rounded-2xl flex flex-col ">
           <h1 className="min-[950px]:text-[49px] w-[100%] text-center font-semibold h-[100px] min-[950px]:pt-[10px] mt-[45px] uppercase">
            Update Password
          </h1>
         <ToastContainer />
          <div className="flex justify-center items-center  h-[90%] min-[950px]:mt-[12px] font-mono">
            <form action=""   encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}>
                <div>
                    <h1 className="text-[25px] mb-[15px]">Old Password</h1>
                    <input
                      type="text"
                      placeholder="Enter the Old Password ..."
                      name="password"
                      className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px]  "
                      value={oldPassword}
                      onChange={(e)=> setOldPassword(e.target.value)}
                    />
                  </div>
                <div>
                    <h1 className="text-[25px] mb-[15px]">New Password</h1>
                    <input
                      type="text"
                      placeholder="Enter the New Password ..."
                      name="password"
                      className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px]  "
                      value={newPassword}
                      onChange={(e)=> setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <h1 className="text-[25px] mb-[15px]">Confirm Password</h1>
                    <input
                      type="text"
                      placeholder="Enter the Confirm Password ..."
                      name="password"
                      className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px]  "
                      value={confirmPassword}
                      onChange={(e)=> setConfirmPassword(e.target.value)}
                    />
                  </div>
              <button type='submit'  className='min-[950px]:h-[50px] min-[950px]:w-[300px] bg-black text-white rounded-3xl min-[950px]:mt-[25px]'
              >Update It </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default UpdatePassword
