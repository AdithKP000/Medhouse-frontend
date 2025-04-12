import React from 'react'
import Header from './Header.js';
import Footer from './Footer.js';
import {Helmet} from "react-helmet"
import { Toaster } from 'react-hot-toast';
const Layout=({ children, title, description, keywords, author })=>{
  return(
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={({minHeight:"50vh"})}>
        <div  style={{minHeight:"3vw"}}></div>
      <Toaster/>
      {children}
      </main>
      <Footer/>
    </div>
  )
}

Layout.defautlProps={
  title:"Ecommerce app -Shop now",
  description:"Mern Stack Project",
  keywords:"mongo monogdb mongoose  Node express react NodeJS  HTML CSS JS Bootstrap",
  author:"Terratox000"
}


export default Layout;