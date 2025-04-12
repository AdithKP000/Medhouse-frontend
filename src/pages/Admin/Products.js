
import { useState, useEffect } from "react"
import AdminMenu from "../../components/layout/AdminMenu.js"
import Layout from "../../components/layout/layout.js"
import axios from "axios"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { FaSearch, FaSpinner } from "react-icons/fa" // Make sure to install react-icons

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("/api/v1/product/get-product")
      setProducts(data.products)
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong")
    } finally {
      setLoading(false)
    }
  }

  // Lifecycle
  useEffect(() => {
    getAllProducts()
  }, []) //Fixed: Added empty dependency array [] to run only once on mount

  // Filter products based on search term
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof p.category === "object" && p.category.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">Products Management</h1>

            {/* Search Bar */}
            <div className="input-group mb-3">
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="text-center">
                <FaSpinner className="spinner-border text-primary" role="status" />
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filteredProducts.map((p) => (
                  <div key={p._id} className="col">
                    <Link to={`/dashboard/admin/product/${p.slug}`} className="text-decoration-none">
                      <div className="card h-100 shadow-sm hover-shadow">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title text-truncate">{p.name}</h5>
                          <p className="card-text">
                            <small className="text-muted">
                              {typeof p.category === "object" ? p.category.name : p.category}
                            </small>
                          </p>
                          <p className="card-text fw-bold">${p.price}</p>
                        </div>
                        <div className="card-footer bg-transparent">
                          <small className="text-muted">Stock: {p.quantity}</small>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {!loading && filteredProducts.length === 0 && (
              <div className="alert alert-info" role="alert">
                No products found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Products

