import { useEffect,useState } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "../../axiosInstance.js"
import Spinner from "../Spinner.js";

export default function AdminRoute(){
    const [ok,setOk]=useState(false)
    const[auth,setAuth]=useAuth()

    useEffect(()=>{
        const authChech=async()=>{
            const res=await axios.get('/api/v1/auth/admin-auth',)
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false )
            }
        }  
         if(auth?.token){
            authChech();
        }
    },[auth?.token])

    return  ok ? < Outlet/>: <Spinner path=""/> ;
}