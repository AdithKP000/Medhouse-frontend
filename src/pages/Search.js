"use client"
import Layout from "../components/layout/layout"
import { useSearch } from "../context/Search"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/cart"
import toast from "react-hot-toast"
import { AiOutlineShoppingCart } from "react-icons/ai"
import "../styles/searchpage.css"

const Search = () => {
  const [values, setValues] = useSearch()
  const navigate = useNavigate()
  const [cart, setCart] = useCart()

  return (
    <Layout title="Search Results">
            <div style={{minHeight:'3vw'}}></div>

      <div className="search-container">
        <div className="search-header">
          <h1>Search Result</h1>
          <h6>{values?.results.length < 1 ? "No Products Found" : `Found ${values?.results.length} products`}</h6>
        </div>

        <div className="products-grid">
          {values?.results.map((p) => (
            <div key={p._id} className="product-card">
              <div className="product-image-container" onClick={() => navigate(`/product/${p.slug}`)}>
                <img className="product-image" src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
              </div>
              <div className="product-details">
                <h5 className="product-name">{p.name}</h5>
                <p className="product-category">{p.cname}</p>
                <p className="product-price">
                  ₹{p.salerate}/- <span className="original-price">₹{p.price}</span>
                </p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => {
                    setCart([...cart, p])
                    localStorage.setItem("cart", JSON.stringify([...cart, p]))
                    toast.success("Item added to cart")
                  }}
                >
                  <AiOutlineShoppingCart className="cart-icon" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Search
