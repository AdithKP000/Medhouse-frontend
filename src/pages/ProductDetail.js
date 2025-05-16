"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "../axiosInstance.js"
import { ShoppingCart, Heart, Star, Truck, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from "../context/cart.js"
import { useAuth } from '../context/Auth.js';

import toast from "react-hot-toast"
import "../styles/productpage.css"
import Layout from "../components/layout/layout.js"

const ProductDetail = () => {
  const [product, setProduct] = useState({})
  const [similarProducts, setSimilarProducts] = useState([])
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState("description")
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const [category,setCategory]=useState('');
  const params = useParams()
  const navigate = useNavigate()

  // Get current date for delivery estimation
  const currentDate = new Date()
  const getFormattedDate = (date) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (!product.price || !product.salerate) return 0
    return Math.round(((product.price - product.salerate) / product.price) * 100)
  }

  // Total price calculation for cart
  const totalPrice = () => {
    try {
      let total = 0
      cart?.map((item) => {
        total = total + item.salerate
      })
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      })
    } catch (error) {
      console.log(error)
      return "₹0.00"
    }
  }

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const myCart = [...cart]
      const index = myCart.findIndex((item) => item._id === pid)
      myCart.splice(index, 1)
      setCart(myCart)
      localStorage.setItem("cart", JSON.stringify(myCart))
    } catch (error) {
      console.log(error)
    }
  }

  // Get product details
  useEffect(() => {
    if (params?.slug) {
      getProduct()
    }
  }, [params?.slug])

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
      if(!data)
      {
        console.log("Unable to retreive data")
      }
      setProduct(data?.product)
      getSimilarProducts(data?.product._id, data?.product.category._id)
      setCategory(data?.product?.category?.name);
      console.log(data?.product?.category?.name);


     
    } catch (error) {
      console.log(error)
    }
  }

  // Get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/similar-product/${pid}/${cid}`)
      setSimilarProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  // Handle image navigation
  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % 3) // Assuming 3 images per product
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? 2 : prev - 1)) // Assuming 3 images per product
  }

  return (
    <Layout>

    <div className="container">
    {product &&(
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={() => navigate("/")}>
          Home
        </span>
        <ChevronRight className="breadcrumb-icon" />
        <span className="breadcrumb-link" onClick={() => navigate(`/category/${category}`)}>
          {category}
        </span>
        <ChevronRight className="breadcrumb-icon" />
        <span className="breadcrumb-current">{product.name}</span>
      </div>

    )}
      {/* Breadcrumb */}
      

      <div className="product-grid">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image-container">
            {product._id && (
              <img
              src={`${
                process.env.NODE_ENV === 'production'
                  ? 'https://medhouse-backend.onrender.com'
                  : 'http://localhost:8080'
              }/api/v1/product/product-photo/${product._id}`}
                alt={product.name || "Product image"}
                className="main-image"
              />
            )}

            <div className="image-navigation">
              <button className="nav-button prev-button" onClick={prevImage}>
                <ChevronLeft className="nav-icon" />
              </button>
              <button className="nav-button next-button" onClick={nextImage}>
                <ChevronRight className="nav-icon" />
              </button>
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="thumbnails">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`thumbnail ${activeImage === index ? "thumbnail-active" : ""}`}
                onClick={() => setActiveImage(index)}
              >
                {product._id && (
                  <img
                  src={`${
                    process.env.NODE_ENV === 'production'
                      ? 'https://medhouse-backend.onrender.com'
                      : 'http://localhost:8080'
                  }/api/v1/product/product-photo/${product._id}`}
                    alt={`${product.name || "Product"} thumbnail ${index + 1}`}
                    className="thumbnail-image"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Similar Products */}
       
        </div>

        {/* Product Details */}
        <div className="product-details">
          {/* Product Title and Ratings */}
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-subtitle">
              <p className="product-brand">{product.cname}</p>
              <span className="separator-dot">•</span>
              <p className="product-company">{product.company}</p>
            </div>

            <div className="product-rating">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`star-icon ${star <= 4 ? "star-filled" : "star-empty"}`}
                  />
                ))}
              </div>
              <span className="review-count">(42 reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="pricing">
            <div className="price-container">
              <span className="current-price">₹{product.salerate}</span>
              <span className="original-price">₹{product.price}</span>
              {calculateDiscount() > 0 && (
                <span className="discount-badge">
                  {calculateDiscount()}% OFF
                </span>
              )}
            </div>
            <p className="tax-info">Including all taxes</p>
          </div>

          {/* Add to Cart */}
          <div className="action-buttons">
            <button
              className="add-to-cart-button"
              onClick={() => {
                setCart([...cart, product])
                localStorage.setItem("cart", JSON.stringify([...cart, product]))
                toast.success("Item added to cart")
              }}
            >
              <ShoppingCart className="button-icon" />
              Add to Cart
            </button>
            <button
              className="buy-now-button"
              onClick={() => {
                navigate("/cart", {
                  state: `/product/${product.slug}`,
                })
              }}
            >
              Buy Now
            </button>
            <button className="wishlist-button">
              <Heart className="wishlist-icon" />
            </button>
          </div>

          {/* Delivery Information */}
          <div className="delivery-card">
            <div className="delivery-content">
              <div className="delivery-header">
                <Truck className="delivery-icon" />
                <div>
                  <h3 className="delivery-title">Delivery Information</h3>
                  {auth?.token ? (
                    <div className="delivery-details">
                      <p>
                        Delivering to: <span className="delivery-address">{auth?.user?.adress}</span>
                      </p>
                      <p className="delivery-date">
                        Expected delivery:{" "}
                        <span className="delivery-date-value">{getFormattedDate(currentDate)}</span>
                      </p>
                    </div>
                  ) : (
                    <div className="login-prompt">
                      <p>Please login to see delivery details</p>
                      <button
                        className="login-link"
                        onClick={() => {
                          navigate("/login", {
                            state: `/product/${product.slug}`,
                          })
                        }}
                      >
                        Login
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="product-tabs">
            <div className="tabs-list">
              <button 
                className={`tab-button ${activeTab === "description" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button 
                className={`tab-button ${activeTab === "details" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button 
                className={`tab-button ${activeTab === "reviews" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === "description" && (
                <div className="description-content">
                  <p>
                    {product.description ||
                      "This medicine is used to treat various conditions as prescribed by your doctor. Please consult a healthcare professional before use."}
                  </p>
                  <p>
                    Always follow the dosage instructions provided by your healthcare provider. Keep out of reach of
                    children and store in a cool, dry place.
                  </p>
                </div>
              )}
              
              {activeTab === "details" && (
                <div className="details-content">
                  <div className="product-specs">
                    <div className="spec-label">Brand</div>
                    <div className="spec-value">{product.company || "N/A"}</div>

                    <div className="spec-label">Category</div>
                    <div className="spec-value">{product.category?.name || "Medicine"}</div>

                    <div className="spec-label">SKU</div>
                    <div className="spec-value">{product._id?.substring(0, 8) || "N/A"}</div>

                    <div className="spec-label">Prescription</div>
                    <div className="spec-value">Required</div>
                  </div>
                </div>
              )}
              
              {activeTab === "reviews" && (
                <div className="reviews-content">
                  <p className="no-reviews">No reviews yet</p>
                  <button className="write-review-button">
                    Write a Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cart Summary and Recommendations */}
        <div className="sidebar">
          {/* Cart Summary */}
          <div className="cart-summary-card">
            <h3 className="card-title">Cart Summary</h3>

            {cart?.length > 0 ? (
              <div className="cart-content">
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item._id} className="cart-item">
                      <div className="cart-item-image-container">
                        <img
                          src={`${
                            process.env.NODE_ENV === 'production'
                              ? 'https://medhouse-backend.onrender.com'
                              : 'http://localhost:8080'
                          }/api/v1/product/product-photo/${item._id}`}
                          alt={item.name}
                          className="cart-item-image"
                        />
                      </div>
                      <div className="cart-item-details">
                        <p className="cart-item-name">{item.name}</p>
                        <p className="cart-item-price">₹{item.salerate}</p>
                      </div>
                      <button
                        className="remove-item-button"
                        onClick={() => removeCartItem(item._id)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-divider"></div>

                <div className="cart-total">
                  <span>Total</span>
                  <span>{totalPrice()}</span>
                </div>

                <button
                  className="checkout-button"
                  onClick={() => {
                    navigate("/cart", {
                      state: `/product/${product.slug}`,
                    })
                  }}
                >
                  Checkout
                </button>
              </div>
            ) : (
              <div className="empty-cart">
                <p className="empty-cart-message">Your cart is empty</p>
                <button className="continue-shopping-button" onClick={() => navigate("/categories")}>
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Delivery Address */}
          {auth?.token && (
            <div className="address-card">
              <h3 className="card-title">Delivery Address</h3>
              <p className="address-text">{auth?.user?.adress || "No address saved"}</p>
              <button
                className="update-address-button"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            </div>
          )}

          {/* Recommended Products */}
          <div className="recommendations">
            <h3 className="card-title">Recommended For You</h3>
            <div className="recommended-products">
              {similarProducts?.slice(0, 4).map((p) => (
                <div
                  key={p._id}
                  className="recommended-product"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  <div className="recommended-product-image-container">
                    <img 
                     src={`${
                      process.env.NODE_ENV === 'production'
                        ? 'https://medhouse-backend.onrender.com'
                        : 'http://localhost:8080'
                    }/api/v1/product/product-photo/${p._id}`} 
                      alt={p.name} 
                      className="recommended-product-image" 
                    />
                  </div>
                  <div className="recommended-product-details">
                    <p className="recommended-product-name">{p.name}</p>
                    <div className="recommended-product-pricing">
                      <p className="recommended-product-price">₹{p.salerate}</p>
                      {p.price > p.salerate && (
                        <p className="recommended-product-original-price">₹{p.price}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>

  )

}

export default ProductDetail
