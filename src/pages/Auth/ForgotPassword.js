import{React ,useState}from 'react'
import Layout from '../../components/layout/layout'
import axios from "../../axiosInstance.js"
import {useNavigate,useLocation } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAuth } from '../../context/Auth.js';
import "../../styles/auth.css";

const ForgotPassword = () => {

const [email,setEmail]=useState("") 
const [newPassword,setNewPassword]=useState("") 
const [answer,setAnswer] = useState("")
const navigate = useNavigate()


const handelSubmit=async (e)=>{
    e.preventDefault();
    try {
        const res= await axios.post("/api/v1/auth/forgort-password",
        {email,newPassword,answer}
        );
        if(res && res.data.success){
          toast.success(res.data && res.data.message,{
            duration: 2000,
          });
         
          
          navigate("/login");
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
     value={newPassword} 
     onChange={(e)=>setNewPassword(e.target.value)}
     placeholder='Enter your New  Password'/>
  </div>

  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputPassword"
     value={answer} 
     onChange={(e)=>setAnswer(e.target.value)}
     placeholder='Enter your Fav Food'/>
  </div>


 



  <button type="submit" className="btn btn-primary">Reset</button>
</form>
</div>
        </Layout>
  )
}

export default ForgotPassword