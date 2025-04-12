import React ,{useEffect,useState}from 'react'
import Layout from '../../components/layout/layout.js'
import AdminMenu from '../../components/layout/AdminMenu.js'
import axios from 'axios';
import toast from 'react-hot-toast';
import{Select} from 'antd'
import { useNavigate,useParams } from 'react-router-dom';
const{Option}=Select;


const UpdateProduct = () => {
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
  const[id, setId] = useState("");
  const navigate = useNavigate();
 const params = useParams();


//get all categories

const getSingleProduct = async () => {

      try {
        const { data } = await axios.get(
          `/api/v1/product/get-product/${params.slug}`
          
        );
        
       
          setCategory(data.product.category._id)
          setName(data.product.name);
          setHsncode(data.product.hsncode);
          setCname(data.product.cname);
          setCompany(data.product.company);
          setBatch(data.product.batch);
          setPrice(data.product.price);
          setSalerate(data.product.salerate);
          setSavings(data.product.savings);
          setPack(data.product.pack);
          setId(data.product._id);
          
         console.log(data.product._id);
        }
        
       catch (error) {
        console.log(error);
      }
    };
    useEffect(()=>{
      getSingleProduct();
        //eslint-disable-next-line
    },[])

const getAllCategory=async ()=>{
  try {
    const {data}= await axios.get('/api/v1/category/get-category')
    if(data?.success){
      setCategories(data?.category)
    }
  } catch (error) {
    console.log(error)
    toast.error("Something went wrong in getting category")
  }
} ;

useEffect(()=>{
  getAllCategory();
  },[]);

  //end of get all category 


//cerate product function
const handleUpdate= async(e)=>{
  e.preventDefault()
  try {
    const productData= new  FormData();
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
    photo && productData.append("photo", photo);
  
    const {data}= await axios.put(`/api/v1/product/update-product/${id}`,productData);  
  
    if (! data?.success) {
      console.log("error occured while updating the product, couldnt obtain the data from the request")
      toast.error(data?.message);
    } else {
      toast.success("Product Updated Successfully");
    }
  } catch (error) {
    console.log(error);
    toast.error("something went wrong");
  }
  
};
 //delete a product
 const handleDelete = async () => {
  try {
    let answer = window.prompt("Are You Sure want to delete this product ? ");
    if (answer!=="yes") return;
    const { data } = await axios.delete(
      `/api/v1/product/delete-product/${id}`
    );
    toast.success("Product Deleted Successfully");
    navigate("/dashboard/admin/products");
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

  return (
    <Layout title={" Dashboard Create-product"}>
        <div className='container-fluid m-3 p-3'>

            <div className='row'>
      <div className='col-md-3'>
        <AdminMenu/>
      </div>
      <div className='col-md-9'>
      <h1>UpdateProduct</h1>
      <div className='m-1 w-75'>
      <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
        </div>
        <div className='mb-3'>
           <input type='text' value={name} placeholder='Write a name' className='form-control'
           onChange={(e)=>{setName(e.target.value )}}></input>
        </div>

        <div className='mb-3'>
           <input type='text' value={hsncode} placeholder='Write the HSN code of the product ' className='form-control'
           onChange={(e)=>{setHsncode(e.target.value )}}></input>
        </div>

        <div className='mb-3'>
           <input type='String' value={price} placeholder='price of the product' className='form-control'
           onChange={(e)=>{setPrice(e.target.value )}}></input>
        </div>


        <div className='mb-3'>
           <input type='text' value={cname} placeholder='Write chemical name of the  product' className='form-control'
           onChange={(e)=>{setCname(e.target.value )}}></input>
        </div>

        <div className='mb-3'>
           <input type='string' value={company} placeholder='company of the product' className='form-control'
           onChange={(e)=>{setCompany(e.target.value )}}></input>
        </div>
        <div className='mb-3'>
           <input type='string' value={batch} placeholder='Batch Name ' className='form-control'
           onChange={(e)=>{setBatch(e.target.value )}}></input>
        </div>
        <div className='mb-3'>
           <input type='string' value={salerate} placeholder='Sale rate of the product' className='form-control'
           onChange={(e)=>{setSalerate(e.target.value )}}></input>
        </div>
       
        <div className='mb-3'>
           <input type='string' value={savings} placeholder='Svaings from the product' className='form-control'
           onChange={(e)=>{setSavings(e.target.value )}}></input>
        </div>
        <div className='mb-3'>
           <input type='string' value={pack} placeholder='pack sizef' className='form-control'
           onChange={(e)=>{setPack(e.target.value )}}></input>
        </div>

        <div className='mb-3'>

        </div>
<div className='mb-3'>
  <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
</div>

<div className="mb-3">
                <button className="btn btn-danger" onClick={()=>{
                  handleDelete();   
                  navigate('/dashboard/admin/product')
                } }>
                  DELETE PRODUCT
                </button>
              </div>

      </div>
      </div>
    </div>
    </div>
            </Layout>
  )
}

export default UpdateProduct