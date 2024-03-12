import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "./Sidebar";
import {useLocation} from 'react-router-dom'
import { UPDATE_USER_RESET } from "../../constant/User";
import {
  getUserDetails,
  updateUser,
} from "../../actions/User";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'

const UpdateUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.pathname.split("/")[3];
    const { user } = useSelector((state) => state.adminUser);
    console.log(user);
    const {
      loading: updateLoading,
      error: updateError,
      isUpdated,
    } = useSelector((state) => state.adminpro);
  
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
  
    useEffect(() => {
      if (user && user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.username);
        setEmail(user.email);
        setRole(user.role);
      }
  
      if (isUpdated) {
        toast.success("User Updated Successfully");
        navigate("/admin/users");
        dispatch({ type: UPDATE_USER_RESET });
      }
    }, [dispatch, navigate, isUpdated, user, userId]);
  
    const updateUserSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", username);
      myForm.set("email", email);
      myForm.set("role", role);
  
      dispatch(updateUser(userId, myForm));
    };
  
  return (
    <>
     <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </button>
            </form>
        </div>
      </div>
    </>
  )
}

export default UpdateUser

