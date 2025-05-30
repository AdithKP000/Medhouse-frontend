import React,{useEffect,useState} from 'react';
import toast from 'react-hot-toast';
import Layout from '../../components/layout/layout.js';
import AdminMenu from '../../components/layout/AdminMenu.js';

import axios from "../../axiosInstance.js"
import CategoryForm from '../../components/Form/CategoryForm.js';
import { Modal } from 'antd';


const CreateCategory = () => {
  const [categories,setCategories]=useState([])
const [name,setName]= useState("")
const[visible,setVisible]=useState(false)
const[selected,setSelected]=useState(null)
const[updatedName,setUpdatedName] = useState("")

const  handelSubmit=async (e)=>{
  e.preventDefault();
  try {
    const{data}=await axios.post("/api/v1/category/create-category",{name});
    getAllCategory()
    if(data?.success){
      toast.success(`${name} is created`);
    }
    else{
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong in input Form");
  }
}


//get all categories

  const getAllCategory=async ()=>{
    try {
      const {data}= await axios.get('/api/v1/category/get-category')
      if(data.success){
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wring in getting category")
    }
  } ;

useEffect(()=>{
  getAllCategory();
},[]);

//update category
const handelUpdate =async (e)=>{
  e.preventDefault();
  try {
    const {data}=await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName})
    if(`${updatedName}is Updated `){
      toast.success(data.message)
      setSelected(null)
      setUpdatedName("")
      setVisible(false)
      getAllCategory()
    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error("Something went wrong")
  }
}
//delete category
const handelDelete =async (pId)=>{
  try {
    const {data}=await axios.delete(`/api/v1/category/delete-category/${pId}`,)
    if(`${name}is Deleted `){
      toast.success(`Category is deleted`)
      getAllCategory()
    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error("Something went wrong")
  }
}

  return (
    <Layout title={"Dashboard Create-Category"}>
                <div className='container-fluid m-3 p-3'>

            <div className='row'>
      <div className='col-md-3'>
        <AdminMenu/>
      </div>
      <div className='col-md-9'>
      <h1>Manage Category</h1>
      <div className='p-3 w-50'>
        <CategoryForm handelSubmit={handelSubmit} value={name} setValue={setName}/>
      </div>
      <div className='w-75'>

     <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    
   
    {categories?.map((c)=>(
        <>
        <tr>
        <td key={c._id}>{c.name} </td>
       <td>
        <button className="btn btn-primary ms-2"  onClick={()=>{
          {setVisible(true); setUpdatedName(c.name);setSelected(c)}
        }}>
          EDIT 
        </button>
         <button className="btn btn-danger ms-2"
         onClick={()=>{handelDelete(c._id)}}
         >Delete </button>
       </td>
      </tr> 
    </>
       ))}
  </tbody>
</table>
      </div>
      <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible} >
        <CategoryForm value={updatedName} setValue={setUpdatedName} handelSubmit={handelUpdate}/>
      </Modal>
      </div>
    </div>
    </div>
            </Layout>
  )
}

export default CreateCategory