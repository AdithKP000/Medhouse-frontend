import{Routes,Route} from 'react-router-dom'
import Layout from './components/layout/layout.js';
import HomePage from './pages/HomePage.js';
import About from './pages/About.js';
import ContactPage from './pages/ContactPage.js';
import Policy from './pages/Policy.js';
import PageNotFound from './pages/PageNotFound.js';
import Register from './pages/Auth/Register.js';
import toast, { Toaster } from 'react-hot-toast';
import Login from './pages/Auth/Login.js';
import Dashboard from './pages/user/Dashboard.js';
import PrivateRoute from './components/Routes/Private.js';
import ForgotPassword from './pages/Auth/ForgotPassword.js';
import AdminRoute from './components/Routes/ProtectedRoute.js';
import AdminDashboard from './pages/Admin/AdminDashboard.js';
import CreateCategory from './pages/Admin/CreateCategory.js';
import CreateProduct from './pages/Admin/CreateProduct.js';
import Users from './pages/Admin/Users.js';
import Orders from './pages/user/Orders.js';
import Profile from './pages/user/Profile.js';
import Products from './pages/Admin/Products.js';
import UpdateProduct from './pages/Admin/UpdateProduct.js';
import Search from './pages/Search.js';
import ProductDetail from './pages/ProductDetail.js';
import Categories from './pages/Categories.js';
import CategoryProduct from './pages/CategoryProduct';
import Cartpage from './pages/cartpage.js';


function App() {
  return (
    <>
<Routes>
  <Route path="/" element={<HomePage/>} />
  <Route path="/search" element={<Search/>} />
  <Route path="/product/:slug" element={<ProductDetail/>} />
  <Route path="/categories" element={<Categories/>} />
  <Route path="/cart" element={<Cartpage/>} />
  <Route path="/category/:slug" element={<CategoryProduct />} />
  <Route path="/dashboard" element={<PrivateRoute/>} >
  <Route path="user" element={<Dashboard/>} />
  <Route path="user/orders" element={<Orders/>} />
  <Route path="user/profile" element={<Profile/>} />

  
  </Route>

<Route path="/dashboard" element={<AdminRoute/>} >
  <Route path="admin" element={<AdminDashboard/>} />
  <Route path="admin/create-category" element={<CreateCategory/>} />
  <Route path="admin/create-product" element={<CreateProduct/>} />
  <Route path="admin/product/:slug" element={<UpdateProduct/>} />
  <Route path="admin/product" element={<Products/>} />
  <Route path="admin/users" element={<Users/>} />

  </Route>
 
  <Route path='/about' element={<About/>}/>
  <Route path ="/forgort-password" element={<ForgotPassword/>}/>
  <Route path='/contact' element={<ContactPage/>}/>
  <Route path='/policy' element={<Policy/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/*' element={<PageNotFound/> }/>
  

</Routes>
    

    </>
  );
}

export default App;
