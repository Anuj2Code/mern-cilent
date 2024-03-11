import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { myOrder} from "../actions/Order";
import { Link } from "react-router-dom";
import LaunchIcon from "@material-ui/icons/Launch";
import './MyOrder.css'

const MyOrder = (props) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  let  id  = '';
  if(user){
    id = user.data._id
  }
  else{
    id=null
  }

  const {orders} = useSelector((state) => state.myOrder);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1,},
    {
      field: "status",
      headerName: "Status",
      minWidth:180,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];
  { user && orders.data && 
    orders.data.forEach((item, index) => {
      rows.push({
        itemsQty: orders.count,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  }
  useEffect(() => {
    dispatch(myOrder(id));
    props.setPr(45);
    const time = setTimeout(()=>{
     props.setPr(100);
    },300)
    return ()=>{clearTimeout(time)}
  }, [dispatch]);
  return (
    <>
    {user && orders ? <div className="h-[100vh]">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          className="myOrdersTable "
          disableSelectionOnClick
          autoHeight
        />
      </div>:(
        <div className="h-[85vh] flex flex-col justify-center items-center  backdrop-blur-xl">
       <h1 className="text-[50px] drop-shadow-md font-[static]">Please Login/Register to continue</h1>
       <Link to={'/login'}>
       <button type='submit'  className='min-[950px]:h-[50px] min-[950px]:w-[300px] bg-black text-white rounded-3xl min-[950px]:mt-[25px] max-[948px]:w-[33vw] max-[948px]:h-[39px]' >Register</button>
       </Link>
        </div>
      )}
    </>
  );
};

export default MyOrder;
