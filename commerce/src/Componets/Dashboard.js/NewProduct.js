import React, { useEffect, useState } from "react";
import "./NewProduct.css";
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Sidebar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constant/Pro";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createProduct} from '../../actions/Product'

const NewProduct = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'));
    const id = user.data._id;
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.newPro);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    'Books',
    'Clothes',
    'Snacks',
    'Technology',
    'shoe',
    'Toy',
    'new',
    'Deal'
  ]
  
  useEffect(() => {
    if (success) {
      toast.success("Product Created Successfully");
      setTimeout(() => {
        navigate("/admin/dashboard");
    }, 1000);
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, navigate,success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    images.forEach((image) => {
      myForm.set("images", image);
    });
    dispatch(createProduct(myForm,id))
  };
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <>
    <div className="dashboard flex">
       <div className="mt-[12px]"><Sidebar/></div>
       <div>
       <ToastContainer />
        <div className="newProductContainer">
          <form
            className="createProductForm "
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div >
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
            <div >
              <AttachMoneyIcon />
              <input
              className="mt-[10px]"
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
              className="mt-[10px] "
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div >
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)} className="mt-[10px]">
                <option value="" className="mt-[10px]">Choose Category</option>
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
              />
            </div>
            <div id="createProductFormFile" className="mt-[10px]" >
              <input
              className="mt-[10px]"
                type="file"
                name="images"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage" >
              {imagesPreview && imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
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
    </>
  )
}

export default NewProduct
