
import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (

    <div className="footer" style={{marginTop:"10vw"}}> 
        <h4 className='text-center' >All rights reserverd &copy; terratox</h4>
        <p className="text-center">
          <Link to="/about">About</Link>
          |
          <Link to="/contact">Contact</Link>
          |
          <Link to="/policy">Policy</Link>
        </p>
        </div>
  )
}

export default Footer