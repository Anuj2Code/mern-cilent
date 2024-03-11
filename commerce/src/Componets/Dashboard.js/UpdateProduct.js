import React, { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {useLocation} from 'react-router-dom'
import {getProDetails,updateProduct} from '../../actions/Product'
import Sidebar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constant/Pro";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProduct = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { error, product } = useSelector((state) => state.productDetails);
    const {isDeleted,loading ,isUpdated} = useSelector((state)=> state. editPro)
  
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
  
    const categories = [
        'kill',
        'daalmot',
        'phone',
        'lap0',
        'mobile',
        'technology',
        'toy',
        'shoe'
      ]
      const location = useLocation();
    const productId = location.pathname.split("/")[3];
  
    useEffect(() => {
      if (product && product._id !== productId) {
        dispatch(getProDetails(productId));
      } else {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setStock(product.Stock);
      }
      if (isUpdated) {
        toast.success("Product Updated Successfully");
        setTimeout(() => {
            navigate("/admin/products"); 
        }, 1000);
        dispatch({ type: UPDATE_PRODUCT_RESET });
      }
    }, [
      dispatch,
      isUpdated,
      productId,
      product,
    ]);
  
    const updateProductSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("price", price);
      myForm.set("description", description);
      myForm.set("category", category);
      myForm.set("Stock", Stock);

      dispatch(updateProduct(productId, myForm));
    };
  
  return (
    <div>
        <ToastContainer />
      <div className="dashboard">
      <div className="mt-[12px]"><Sidebar/></div>
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
               className="mt-[10px]"
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
               className="mt-[10px]"
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
               className="mt-[10px]"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
               className="mt-[10px]"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=""  className="mt-[10px]">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
               className="mt-[10px]"
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <button
             className="mt-[10px]"
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct
