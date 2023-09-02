import React from "react";
import Footers from "./Footer";
import Headers from "./Header";
import {Helmet} from "react-helmet";
import {Toaster} from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';

 const Layout = ({children,title,Author}) =>{
    return (
        <div>
          <Helmet>
          <meta charSet="utf-8" />
          <meta name="Author" content="Rashmi kiran" />
          <title>ECOMMERCE APP</title>

          </Helmet>
         <Headers />
         <main style={{ minHeight: "70vh" }}>{children}</main>
         <Toaster />
         <Footers style={{ minHeight: "80vh" }} />
        
        </div>
    )
 }

 Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  Author: "RASHMI KIRAN",
};

export default Layout;