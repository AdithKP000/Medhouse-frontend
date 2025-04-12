import React from 'react'
import Layout from './../../components/layout/layout.js';
import UserMenu from '../../components/layout/UserMenu.js';
import { useAuth } from '../../context/Auth.js';

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title={"Dashboard"}>
       <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9'>
                  <div className='card w-75 p-3'>
                    <h3> Name: {auth?.user?.name}</h3>
                    <h3> Email: {auth?.user?.email}</h3>
                    <h3> Adress: {auth?.user?.adress}</h3>



                  </div>
                </div>
            </div>
        </div>
        </Layout>
  )
}

export default Dashboard