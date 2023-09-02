import React, {useState , useEffect} from "react";
import axios from "axios";
import { useNavigate,useParams} from "react-router-dom";
import { useWishlist } from "../Context/Wish";
import { useAuth } from "../Context/Auth";
import Layout from "../components/Layout/Layout";
import { FaHeart } from "react-icons/fa";
import "../Styles/WishlistPage.css";


const WishlistPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [auth] = useAuth();
  const [wishlist, setWishlist] = useWishlist();
  

 //detele item
 const removeWishlistItem = (pid) => {
  try {
    let myWishlist = [...wishlist];
    let index = myWishlist.findIndex((item) => item._id === pid);
    myWishlist.splice(index, 1);
    setWishlist(myWishlist);
    localStorage.setItem("wishlist", JSON.stringify(myWishlist));
  } catch (error) {
    console.log(error);
  }
};

return (
  <Layout>
      <div>
        <div >
          <h1>
            {!auth?.user
              ? "Hello Guest p"
              : `Hello  ${auth?.token && auth?.user?.name}`}
            <h2 className="text-center">
              {wishlist?.length
                ? `You Have ${wishlist.length} items in your Wishlist ${
                    auth?.token ? "" : "please login to additem !"
                  }`
                : " Your Wishlist Is Empty"}
            </h2>
          </h1>
        </div>
      </div>
      
        <div className="col">
          <div className="d-flex flex-wrap">
            {wishlist?.map((p) => (
              <div  className="col-6 col-md-4"key={p._id}>
                <div className="card">
                  <img
                    src={`http://localhost:8080/api/v1/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height="200px"
                    width={"150px"}
                    
                    
                  />
                  <img
      src={`http://localhost:8080/api/v1/product-photo1/${p._id}`}
      className="hover"  onClick={() => navigate(`/product/${p.slug}`)}
      alt={p.name}
      height="200px"
      width={"150px"}
    />
                </div>
                <div>
                  <p className="text-center mb-0">{p.name}</p>
                  {p.description && <p className="text-center mb-0">{p.description.substring(0, 10)}...</p>}
                  <p className="text-center mb-0"> {p.price?.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</p>
                </div>
                <div className="bt" style={{width:"100%"}}>
                  <button className="button1 text-center" 
                  
                    onClick={() => removeWishlistItem(p._id)}
                  >
                    Remove
                  </button>
                  <button className="button1 text-center">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
          </div>
          
          </Layout>
);
            };   

export default WishlistPage;