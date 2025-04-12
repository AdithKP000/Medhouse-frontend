import Layout from "../components/layout/layout"
import { Link } from "react-router-dom"
import useCategory from "../hooks/useCategory"

const Categories = () => {
  const categories = useCategory()

  // Function to get a placeholder image for each category
  // You can replace these with actual category images later


  return (
    <Layout title={"All Categories"}>
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold">Shop by Category</h1>
            <p className="text-muted">Browse our wide selection of products across all categories</p>
          </div>
        </div>

        <div className="row g-4">
          {categories.map((c) => (
            <div className="col-md-6 col-lg-4" key={c.slug}>
              <div className="card h-100 shadow-sm border-0 overflow-hidden">
                <div className="position-relative">
                 
                  <div className="position-absolute top-0 start-0 p-3">
                    {/* <span className="badge bg-primary">{c.name}</span> */}
                  </div>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{c.name}</h5>
                  <p className="card-text text-muted">
                    {/* Add description if available in your category data */}
                    Explore our selection of {c.name.toLowerCase()} products
                  </p>
                  <Link to={`/category/${c.slug}`} className="btn btn-primary mt-auto">
                    Browse {c.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Categories

