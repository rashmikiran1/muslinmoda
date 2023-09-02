import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../Context/Cart";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../Styles/CategoryProduct.css";
import axios from "axios";
import { height } from "@mui/system";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      
      <div className="category">
      <div className="y">
       <h6 style={{color:"blue"}}>Total Product Found = {products?.length} </h6>
       </div>
      {category && (
    <>
      {category.name === 'saree' && (
        <img
          src="http://localhost:3000/images/saree.avif"
          alt="Image 1"
          className="category-image animate-inward" style={{ height:"500px"}}
        />
      )}
       {category.name === 'gown' && (
        <img
          src="http://localhost:3000/images/gown.jpg"
          alt="Image 1"
          className="category-image" style={{width:"100%"}} 
        />
      )}
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="col-6 col-md-3" key={p._id} >
                  <img
                    src={`http://localhost:8080/api/v1/product-photo/${p._id}`}
                    className="card-img-top"  onClick={() => navigate(`/product/${p.slug}`)}
                    alt={p.name}
                    
                  />
                  <div className="card-body">
                    <div className="card-name">
                      <h5 className="card-title">{p.name}</h5>
                      </div>
                      <p className="card-text ">
                      {p.description.substring(0, 20)}...
                    </p>
                      <h5 className="card-price">
                        {p.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </h5>
                   
                  </div>
                </div>
              ))}
            </div>
             <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> 
        </>
      )}
      </div>
    </Layout>
  
  );
};

export default CategoryProduct;