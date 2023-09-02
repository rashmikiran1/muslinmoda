import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";

const Photo = () => {
    const [product, setProduct] = useState({});
    
  return (
    <Layout>
       return (
    <div className="photo-container">
      <img src={`http://localhost:8080/api/v1/product-photo/${product._id}`} alt="Full-size Photo" />
    </div>

    </Layout>
  );
};

export default Photo