import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PieChart } from '@mui/x-charts/PieChart';
import {getAllOrders} from '../../actions/Order.js'
import {getAdminProduct} from '../../actions/Product'
import {getAllUsers} from '../../actions/User.js'
const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders,totalAmount} = useSelector((state) => state. allOrder);
  const {users} = useSelector((state) => state.getallUser);
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

const data = [
    { id: 0, value: outOfStock, label: 'Out Of Stock' },
    { id: 1, value: products.length - outOfStock, label: 'In Stock' },
  ];

  return (
   <>
    <div className="dashboard min-h-[100vh] mt-[10px]">
      <Sidebar />
      <div className="dashboardContainer">
        <h1 component="h1">Dashboard</h1>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
       <div className="flex justify-center">

       </div>
      <div className="mt-[45px] relative right-28">
      <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 90, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={400}
    />
      </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default Dashboard;
