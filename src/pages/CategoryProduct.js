import React from 'react'
import Layout from '../components/layout/layout'
import { useState,useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart,  } from "react-icons/ai";
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import "../styles/categoryProduct.css"


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
        <div className="d-flex flex-wrap ">

{products?.map((p) => (
 <div key={p._id} className=" prodcard card  col-md-4 col-xs-12 "  >
 <img  id='productImage'
   src={`/api/v1/product/product-photo/${p._id}`}
   
   alt={p.name}
   onClick={()=>navigate(`/product/${p.slug}`)}
  />
 <div className="card-body ">
   <h5 className="card-title ">{p.name}</h5>
   <p className="card-text">{p.cname}</p>

   <p id="price">
       ₹{p.salerate}/-   <s>{p.price}</s> 
   </p>
   <div className="d-grid gap-2 col-12 mx-auto">
     {/* <button className="btn btn-primary btn-sm" onClick={()=>navigate(`/product/${p.slug}`)} type="button">
       See details
     </button> */}
     <button id="downBtn" className="btn  btn-hover btn-outline-success btn-sm "
     onClick={()=>{
       setCart([...cart,p]);
       localStorage.setItem("cart",JSON.stringify([...cart,p]));
       toast.success("item added to cart")
     }}
      >  <AiOutlineShoppingCart/> Add to Cart
     
     </button>
   </div>
   
 </div>
</div>
))}

</div>
    </div>
   </Layout>
  )
}

export default CategoryProduct