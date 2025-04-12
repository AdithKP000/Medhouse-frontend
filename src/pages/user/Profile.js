
import Layout from '../../components/layout/layout.js'
import UserMenu from '../../components/layout/UserMenu.js'
import { useState ,useEffect} from 'react'
import { useAuth } from '../../context/Auth.js'
import toast from 'react-hot-toast'
import axios from 'axios'


const Profile = () => {
//context
    const [auth,setAuth]=useAuth()
//state
const [name,setName]=useState("") 
const [password,setPassword]=useState("")
const [email,setEmail]=useState("") 
const [phone,setPhone]=useState("") 
const [adress,setAdress]=useState("") 

 useEffect(()=>{
    const { name,email,phone,password,adress} = auth.user
    setName(name)
    setEmail(email)
    setPhone(phone)
    setAdress(adress)
  
},[auth?.user ])

//form handle submit
const handelSubmit=async (e)=>{
    e.preventDefault();
    try {
        const {data}= await axios.put("/api/v1/auth/profile",
        {name,email,phone,adress,password}
        )
        if(data?.error){
          toast.error(data?.error)
        }
        else{
          setAuth({...auth, user:data?.updatedUser});
          let ls=localStorage.getItem("auth");
          ls =JSON.parse(ls);
          ls.user= data.updatedUser;
          localStorage.setItem('auth',JSON.stringify(ls));
          toast.success("Profile updated successfully");
        }
       
    } catch (error) {
        console.log(error)
        toast.error('Something went worng',{
          duration: 2000,
        })
        }
}

  return (
    <Layout title={"your Profile"}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9'>
                <div className='form-container'>
        <h1>User Profile</h1>
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
      placeholder='Enter your Email'
      disabled
      />
   
  </div>
  <div className="mb-3 ">
    <input type="Password" className="form-control" id="exampleInputPassword"
     value={password} 
     onChange={(e)=>setPassword(e.target.value)}
     placeholder='Enter your Password'
    />
  <div className="password">
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
<button type="submit" className="btn btn-primary">Udpate</button>
</form>
</div>

                </div>
            </div>
        </div>
        </Layout>
  )
}

export default Profile