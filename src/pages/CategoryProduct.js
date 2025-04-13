import React from 'react'
import Layout from '../components/layout/layout'
import { useState,useEffect } from 'react'
import axios from "../axiosInstance.js"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart,  } from "react-icons/ai";
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import '../styles/Homepage.css';



const CategoryProduct = () => {
const [products, setProducts]= useState([]);
const [categories, setCategories] = useState({});
const params = useParams();
const navigate=useNavigate();
const [cart,setCart]=useCart();


useEffect(()=>{
    if (params?.slug) getProductBycat()
},[params?.slug])
const getProductBycat= async()=>{
    try {
        const {data}= await axios.get(`/api/v1/product/product-category/${params.slug}`)
        setProducts(data?.product)
        setCategories(data?.category)
    } catch (error) {
        console.log(error+"Occured"
        )
    }
}

  return (
   <Layout >
    <div className='container mt-3' style={{position:"relative",top:"5vw", marginBottom:"100px"
    }}> 
        <h6 className='text-center'> Category - {categories.name}</h6>
        <h4>{products.length} item Found</h4>
        <div className="products-grid1">
          {products?.length === 0 ? (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try a different category or reset filters</p>
            </div>
          ) : (
            products?.map((p) => (
              <div key={p._id} className="product-card1">
                <div className="product-image" onClick={() => navigate(`/product/${p.slug}`)}>
                  <img src={`${
                    process.env.NODE_ENV === 'production'
                      ? 'https://medhouse-backend.onrender.com'
                      : 'http://localhost:8080'
                  }/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-category">{p.cname}</p>
                  <div className="product-price">
                    <span className="sale-price">₹{p.salerate}/-</span>
                    <span className="original-price1">₹{p.price}</span>
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart", JSON.stringify([...cart, p]));
                      toast.success("Item added to cart");
                    }}
                  >
                    <AiOutlineShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
    </div>
   </Layout>
  )
}

export default CategoryProduct