import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        {/* <img src={logo} alt="Ecommerce" /> */}
      </Link>
      <Link to="/admin/dashboard">
        <p>
         <h1>Dashboard</h1>
        </p>
      </Link>
      <Link> 
            <Link to="/admin/product">
             <h1>Add Pro</h1>
            </Link>
      </Link>
      <Link to="/admin/orders">
        <p>
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
         Users
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
