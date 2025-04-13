import React ,{useEffect,useState}from 'react'
import Layout from '../../components/layout/layout.js'
import AdminMenu from '../../components/layout/AdminMenu.js'
import axios from "../../axiosInstance.js"
import toast from 'react-hot-toast';
import{Select} from 'antd'
import { useNavigate } from 'react-router-dom';
const{Option}=Select;


const CreateProduct = () => {
  const[categories,setCategories]=useState([])
  const[name,setName]=useState("")
  const[hsncode,setHsncode]=useState("")
  const[cname,setCname]=useState("")
  const[company,setCompany]=useState("")
  const[batch,setBatch]=useState("")
  const[price,setPrice]=useState("")
  const[salerate,setSalerate]=useState("")
  const[category,setCategory]=useState("")
  const[savings,setSavings]=useState("")
  const[pack,setPack]=useState("")
  const[photo,setPhoto]=useState("")

  const navigate=useNavigate()



//get all categories

const getAllCategory=async ()=>{
  try {
    const {data}= await axios.get('/api/v1/category/get-category')
    if(data?.success){
      setCategories(data?.category)
    }
  } catch (error) {
    console.log(error)
    toast.error("Something went wring in getting category")
  }
} ;

useEffect(()=>{
  getAllCategory();
  },[]);


  //end of get all category 

//cerate product function
const handleCreate= async(e)=>{
  e.preventDefault()
  try {
    const productData= new  FormData()
    productData.append("name",name)
    productData.append("hsncode",hsncode)
    productData.append("cname",cname)
    productData.append("company",company)
    productData.append("batch",batch)
    productData.append("price",price)
    productData.append("salerate",salerate)
    productData.append("category",category)
    productData.append("savings",savings)
    productData.append("pack",pack)
    productData.append("price",price)
    productData.append("photo",photo)




    const { data }=axios.post("/api/v1/product/create-product", productData);
    if(data?.success){
           toast.error(data?.message)
    }
    else{
      toast.success("Succesfully created new product")
      navigate("/dashboard/admin/product")
    }
  } catch (error) {
    console.log(error)
    toast.error("Something went wrong")
  }
}


  return (
    <Layout title={" Dashboard Create-product"}>
        <div className='container-fluid m-3 p-3'>

            <div className='row'>
      <div className='col-md-3'>
        <AdminMenu/>
      </div>
      <div className='col-md-9'>
      <h1>CreateProduct</h1>
      <div className='m-1 w-75'>
        <Select bordered={false} 
        placeholder="Select Category" 
        size="large"
        showSearch
         className='form-select  mb-3'
          onChange={(value)=>{setCategory(value);}}>

          {categories?.map((c)=>(
            <Option key={c._id } value={c._id}>{c.name}</Option>
          ))}

        </Select>
        <div className='mb-3'>
          <label  className='btn btn-outline-secondary col-md-12'>
            {photo ?photo.name : " Upload Photo" }
            < input type="file" name="photo" accept='image/*'
             onChange={(e)=>{
              setPhoto(e.target.files[0])
             }} hidden 
             />
          </label>
        </div>
        <div className="mb-3">
          {photo && (
            <div className="text-center">
              <img src={URL.createObjectURL(photo)} 
              alt=" product_photo" 
              height={'200px'} 
              className="img img-responsive"/>  
            </div>

          )}
        </div>
        <div className='mb-3'>
           <input type='text' value={name} placeholder='Write the Name of the Product' className='form-control'
           onChange={(e)=>{setName(e.target.value )}}></input>
        </div>

        <div className='mb-3'>
           <input type='text' value={hsncode} placeholder='Write the HSN Code of the Product ' className='form-control'
           onChange={(e)=>{setHsncode(e.target.value )}}></input>
        </div>

        <div className='mb-3'>
           <input type='String' value={price} placeholder='Price of the Product' className='form-control'
           onChange={(e)=>{setPrice(e.target.value )}}></input>
        </div>


        <div className='mb-3'>
           <input type='text' value={cname} placeholder='Write Chemical Name of the Product' className='form-control'
           onChange={(e)=>{setCname(e.target.value )}}></input>
        </div>

        <div className='mb-3'>
           <input type='string' value={company} placeholder='Company of the Product' className='form-control'
           onChange={(e)=>{setCompany(e.target.value )}}></input>
        </div>
        <div className='mb-3'>
           <input type='string' value={batch} placeholder='Batch Name' className='form-control'
           onChange={(e)=>{setBatch(e.target.value )}}></input>
        </div>
        <div className='mb-3'>
           <input type='string' value={salerate} placeholder='Sale Rate of the Product' className='form-control'
           onChange={(e)=>{setSalerate(e.target.value )}}></input>
        </div>
       
        <div className='mb-3'>
           <input type='string' value={savings} placeholder='Savings from the Product' className='form-control'
           onChange={(e)=>{setSavings(e.target.value )}}></input>
        </div>
        <div className='mb-3'>
           <input type='string' value={pack} placeholder='Pack Size' className='form-control'
           onChange={(e)=>{setPack(e.target.value )}}></input>
        </div>

        <div className='mb-3'>

        </div>
<div className='mb-3'>
  <button className='btn btn-primary' onClick={handleCreate}> Create Product</button>
</div>
      </div>
      </div>
    </div>
    </div>
            </Layout>
  )
}

export default CreateProduct