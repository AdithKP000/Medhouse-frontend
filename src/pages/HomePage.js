import { useEffect, useState } from 'react';
import Layout from '../components/layout/layout.js';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart.js';
import axios from "../axiosInstance.js"
import toast from 'react-hot-toast';
import SearchInput from '../components/Form/SearchInput.js';
import { AiOutlineShoppingCart, AiOutlineReload } from "react-icons/ai";
import '../styles/Homepage.css';


const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  // Handle Filter
  const handleFilter = (id) => {
    setChecked(id);
    setActiveCategory(id);
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
    setActiveCategory(null);
    getAllProducts();
  };

  return (
    <Layout title={"Medicity - Your Health Partner"}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 id="mainheading"> MEDHOUSE</h1>
          <h1>Your Health, Our Priority</h1>
          <p>Find quality healthcare products at affordable prices</p>
          <button className="shop-now-btn" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
            Shop Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-item">
          <img className="feature-icon" src="../images/CART.png" alt="Free Shipping" />
          <div className="feature-text">
            <h3>Free Shipping</h3>
            <p>On all orders above ₹500</p>
          </div>
        </div>

        <div className="feature-item">
          <img className="feature-icon" src="../images/RETURN.png" alt="Return Policy" />
          <div className="feature-text">
            <h3>Return Policy</h3>
            <p>Easy returns within 7 days</p>
          </div>
        </div>

        <div className="feature-item">
          <img className="feature-icon" src="../images/CHECKOUT.png" alt="Secure Checkout" />
          <div className="feature-text">
            <h3>Secure Checkout</h3>
            <p>Ensure smooth transaction</p>
          </div>
        </div>

        <div className="feature-item">
          <img className="feature-icon" src="../images/GIFTCARD.png" alt="Offers & Gifts" />
          <div className="feature-text">
            <h3>Offers & Gifts</h3>
            <p>Discounted rates and gifts</p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <h2>Find Your Products</h2>
          <SearchInput />
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products-section">
        <div className="section-header">
          <h2>Our Products</h2>
          <p className="section-description">
            High-quality, trusted healthcare products tailored to support your wellness, every day
          </p>
        </div>

        {/* Categories Filter */}
        <div className="categories-filter">
          <ul>
            {categories?.map((c) => (
              <li
                key={c._id}
                className={activeCategory === c._id ? 'active' : ''}
                onClick={() => handleFilter(c._id)}
              >
                {c.name}
              </li>
            ))}
            <li className="reset-filter" onClick={resetFilters}>
              <AiOutlineReload /> Reset
            </li>
          </ul>
        </div>

        {/* Products Grid */}
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
                  <img src={`https://medhouse-backend.onrender.com/api/v1/product/product-photo/${p._id}`} alt={p.name} />
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
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-image">
          <img src="../images/bgremove.png" alt="Health Products" />
        </div>
        <div className="cta-content">
          <h2>Take Charge of Your Health Today!</h2>
          <p>
            Visit Medicity for trusted, high-quality wellness products and personalized support. 
            Let us help you feel your best every day. Stop by or contact us for expert health guidance!
          </p>
          <button className="cta-button" onClick={() => navigate('/contact')}>Contact Us</button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                Medicity is my go-to online medicine shop! The website is user friendly and easy to navigate. 
                I can easily search for medications I need and place an order within minutes.
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">JD</div>
              <p className="author-name">John Doe</p>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                The medicines are in perfect condition, and the expiry dates were well within the acceptable range. 
                Medicity is a trustworthy online shop that I highly recommend.
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">JD</div>
              <p className="author-name">Johna Donald</p>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                The wide selection of medicines available is impressive and I appreciate the options to choose 
                specific brands. Their customer service is also excellent!
              </p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">SD</div>
              <p className="author-name">Sarah Davis</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
