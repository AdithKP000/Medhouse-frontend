import{React ,useState}from 'react'
import Layout from '../../components/layout/layout'
import axios from 'axios'
import {useNavigate,useLocation } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAuth } from '../../context/Auth.js';
import "../../styles/auth.css";

const Register = () => {

const [email,setEmail]=useState("") 
const [password,setPassword]=useState("") 
const [auth,setAuth]=useAuth()
 
const navigate = useNavigate()
const location= useLocation()


const handelSubmit=async (e)=>{
    e.preventDefault();
    try {
        const res= await axios.post("/api/v1/auth/login",
        {email,password}
        );
        if(res && res.data.success){
          toast.success(res.data && res.data.message,{
            duration: 2000,
          });
          setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
          });
        
          
          localStorage.setItem("auth",JSON.stringify(res.data));
          navigate(location.state || "/");
        }
        else{
            toast.error(res.data.message,{
              duration: 2000,
            });
            navigate('/login');
            
        }
    } catch (error) {
        console.log(error)
        toast.error('Something went worng',{
          duration: 2000,
        })
        
    }
    

}

  return (
    <Layout title={"Login"}>
        <div className='form-container'>
        <h1>Login</h1>
 <form onSubmit={handelSubmit}>
  

  <div className="mb-3">
    <input type="Email" className="form-control" id="exampleInputEmail"
     value={email}
     onChange={(e)=>setEmail(e.target.value)}

      placeholder='Enter your Email'/>
  </div>

  <div className="mb-3">
    <input type="Password" className="form-control" id="exampleInputPassword"
     value={password} 
     onChange={(e)=>setPassword(e.target.value)}

     placeholder='Enter your Password'/>
  </div>
  <div className='mb-3'>
  <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgort-password')}} >
Forgot password </button>
  </div>



  <button type="submit" className="btn btn-primary">Login</button>


</form>
<br></br>
<p> Don't have an account?  <span onClick={()=>{
  navigate('/register')
}}  style={{cursor:"pointer"}}> Register now! </span></p>
</div>
        </Layout>
  )
}

export default Register