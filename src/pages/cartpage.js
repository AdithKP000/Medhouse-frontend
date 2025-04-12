import React from 'react'
import Layout from '../components/layout/layout'
import { useCart } from '../context/cart.js'
import { useAuth } from '../context/Auth.js'
import { useNavigate } from 'react-router-dom'

const Cartpage = () => {
    const[auth,setAuth]=useAuth();
    const navigate=useNavigate();
    const[cart,setCart]=useCart();


        //total
        const totalPrice=()=>{
            try {
                let total=0;
                cart?.map((item)=>{
                     total = total+item.salerate;
                    });
                return total.toLocaleString("en-IN",{
                    style:"currency",
                    currency:"INR",
                });

            } catch (error) {
                console.log(error)
            }
        }

        //Delete item from cart
    const removeCartItem=(pid)=>{
      try {
        let myCart=[...cart]
        let index=myCart.findIndex(item=> item._id===pid)
        myCart.splice(index,1)
        setCart(myCart);
        localStorage.setItem("cart",JSON.stringify(myCart));
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <Layout>
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>  
                <h1 className='text-center bg-light p-2'>{`Hello ${auth?.token && auth?.user.name} !    `}</h1>
                <h4 className='text-center'>
                    {cart?.length
                    ? `you have ${cart.length} items in yout cart  ${
                    auth?.token ? "" : "please login to checkout"}` 
                        :"Your Cart is empty"}
                </h4>
                </div>
            </div>
            <div className="row">
                <div className=" col-sm-8 col-md-8 ">
                    cart items
                    {cart?.map( (p) => (
                        <div className='row'>
                <div key={p._id} className="card m-2 col-md-4" style={{ width: "15.23vw", height:"auto   " }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  onClick={()=>navigate(`/product/${p.slug}`)}
                />
               
              </div>
              <div className='col-md-8'>
                <div className=" pt-4 card-body">
                    <p>{p.name}</p>
                    <p>{p.cname}</p>
                    <p>Rs/-{p.salerate}</p>
                </div>
                <button className='btn btn-danger' onClick={()=>removeCartItem(p._id)}>
                        Remove Item
                </button>
              </div>
              <hr></hr>
              </div>
              
))}                
                </div>
                <div className="container col-sm-4 col-md-4 ">
                        <h2 className='pb-2'> Cart Summary</h2>
                        <hr/>
                        <h4>Total: {totalPrice()} </h4>
                        {auth?.user?.adress ?(
                          <>
                            <div className='mb-3'>
                                <h4>Current Address</h4>
                                <h5>{auth?.user?.adress}</h5>
                                <button className="btn btn-outline-info"
                                onClick={()=>{
                                  navigate('/dashboard/user/profile')}}>
                                  Update adress</button>
                            </div>
                         </>
                        ):(
                          <div className="mb-3">
                            {
                              auth?.token ?( 
                              <button className='btn btn-outline-warning'  
                               onClick={()=>{navigate('/dashboard/user/profile')}}>
                                Update Address
                              </button>
                              ):(
                                <button className='btn btn-outline-info' 
                                onClick={()=>{navigate('/login',{
                                  state:'/cart'
                                })}}>
                                   Please login to checkout</button>
                              )
                            }
                          </div>
                        )}
                        

                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Cartpage