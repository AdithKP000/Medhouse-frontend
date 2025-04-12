import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth.js';

import { AiFillMedicineBox,AiOutlineShoppingCart  } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import SearchInput from '../Form/SearchInput.js';
import useCategory from '../../hooks/useCategory.js';
import { useCart } from '../../context/cart.js';
import { Badge } from 'antd';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart]= useCart();  
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    localStorage.removeItem("auth");
    toast.success("Logged Out Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor:"#099a73", padding:"1vw", position: "fixed", top: 0, width: "100%", zIndex: "1000"}}>
        <div className="container-fluid">
        <Link className="navbar-brand" to="#">
              <AiFillMedicineBox />
              MEDHOUSE
            </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link" >
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to={'/categories'} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </Link>
                <ul className="dropdown-menu"  >
                <li >
                      <Link className="dropdown-item"  to={`/categories `}>All Categories</Link>
                    </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link className="dropdown-item"  to={`/category/${c.slug}`}>{c.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" style={{fontWeight:"600"}}>
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <li>
                        <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item">
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="dropdown-item">
                        <NavLink onClick={handleLogout} to="/login" className="nav-link">
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                <Badge count={cart?.length} showZero>
                  <AiOutlineShoppingCart/>
                  Cart
                </Badge>
              </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
