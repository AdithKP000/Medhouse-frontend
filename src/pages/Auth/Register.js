import{React ,useState}from 'react'
import Layout from '../../components/layout/layout'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import "../../styles/auth.css";

const Register = () => {
const [name,setName]=useState("") 
const [email,setEmail]=useState("") 
const [password,setPassword]=useState("") 
const [phone,setPhone]=useState("") 
const [adress,setAdress]=useState("") 
const [answer,setAnswer]= useState("")
const navigate = useNavigate()
const [alert,setAlert]=useState("")


const handelSubmit=async (e)=>{
    e.preventDefault();
    try {
        const res= await axios.post("/api/v1/auth/register",
        {name,email,password,phone,adress,answer}
        );
        if(res && res.data.success){
          toast.success(res.data && res.data.message,{
            duration: 2000,
          });
            navigate('/login');
                    
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
    <Layout title={"Regisetr"}>
        <div className='form-container'>
        <h1>Register</h1>
 <form onSubmit={handelSubmit}>
  <div className="mb-3">
  <input type="text" className="form-control" id="exampleInputName"
   value={name} 
   onChange={(e)=>setName(e.target.value)}
   placeholder='Enter your Name'/>
  </div>

  <div className="mb-3">
    <input type="Email" className="form-control" id="exampleInputEmail"
     value={email}
     onChange={(e)=>setEmail(e.target.value)}

      placeholder='Enter your Email'/>
  </div>

  <div className="mb-3 ">
    <input type="Password" className="form-control" id="exampleInputPassword"
     value={password} 
     onChange={(e)=>setPassword(e.target.value)}

     placeholder='Enter your Password'/>
 
  <div class="password">
    <p   
    value={alert}
     onChange={(e)=>setAlert(e.target.value)}>
  The password Should be 7 characters long</p>
    
  </div>
  </div>




 <div className="mb-3">
    <input type="Number" className="form-control" id="exampleInputPhone" 
    value={phone} 
    onChange={(e)=>setPhone(e.target.value)}

    placeholder='Enter your Phone'/>
  </div>
  

  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputAdress" 
    value={adress} 
    onChange={(e)=>setAdress(e.target.value)}

    placeholder='Enter your Adress'/>
  </div>

  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputAnswer" 
    value={answer} 
    onChange={(e)=>setAnswer(e.target.value)}
    placeholder='Enter  your Favorite food'/>
  </div>


  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
        </Layout>
  )
}

export default Register