import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio, Modal, Button } from "antd";
import { Prices } from "../components/Prices";
import axios from "axios";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../Styles/AllProduct.css";
import { FaHeart } from "react-icons/fa";
import { BiFilter } from "react-icons/bi";
import toast from "react-hot-toast";
import { useWishlist } from "../Context/Wish";
import { useAuth } from "../Context/Auth";
import ProductFilter from "./filter";
import Sort from "./sort";

const HomePage = () => {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useWishlist();
  const [auth,setAuth] = useAuth();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [showSortedProducts, setShowSortedProducts] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const showFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const hideFilterModal = () => {
    setIsFilterModalVisible(false);
  };
  
  

  
  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/getcategory`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    }, []);
  
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product-list/${page}`, {
     
    });
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product-list/${page}`);
      setLoading(false);
      setProducts((prevProducts) => [...prevProducts, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
 
  useEffect(() => {
     getAllProducts();
  }, []);

  //get filterd product
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) applyFilters();
  }, [checked, radio]);

  
 
  const applyFilters = async (checkedCategories, priceRange) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/product-filters`, {
        checked: checkedCategories,
        radio: priceRange,
        sortBy: sortBy,
        
      });
  
      const { success, products } = response.data;
  
      if (success) {
      
        setProducts(products);
      }
    } catch (error) {
      console.log(error);
      // Handle error response
    }
  };

  // Function to reset filters
  const resetFilters = () => {
    // Reset the filter options to their default values
    setChecked([]);
    setRadio([]);
  };
  //handle wishlist
  const handleWishlistClick = (productId) => {
    const updatedProducts = products.map((p) => {
      if (p._id === productId) {
        return {
          ...p,
          isWishlist: !p.isWishlist,
        };
      }
      return p;
    });
  
    setProducts(updatedProducts);
  };

  //sorting
  useEffect(() => {
    fetchProducts();
  }, [sortBy]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/sort?sortBy=${sortBy}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleButtonClick = () => {
    setShowSortedProducts((prevState) => !prevState);
  };
  
  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
  };
  return (
    <Layout title={"ALl Products - Best offers "}>
     <div className=" home-page" style={{ margin: ' 0 0 0 10px' }} >
    
<div className="col">
  <div className="sorting">
<button onClick={showFilterModal}><BiFilter /> Filter</button>
<Sort sortBy={sortBy} handleSortChange={handleSortChange} />
</div>
  <div className="d-flex flex-wrap">
    {products?.map((p) => (
      <div className="col-6 col-md-3" key={p._id}>
        <img
          src={`http://localhost:8080/api/v1/product-photo/${p._id}`}
          className="card-img-top"
          onClick={() => navigate(`/product/${p.slug}`)}
          alt={p.name}
         
        />
      
                 <div
          className={`wishlist-icon ${p.isWishlist ? 'active' : ''}`}
          
          onClick={() => {
            console.log(auth.isLoggedIn);
            if (!auth.isLoggedIn) {
              console.log("please login to add item in wishlist")
                return;
              }
            
            setWishlist([...wishlist, p]);
            localStorage.setItem(
              "wishlist",
              JSON.stringify([...wishlist, p])
            );
            toast.success("Item Added to Wishlist");
          }}
          >
        
        <FaHeart className="heart-icon" />
        </div>
                <div className="card-body">
                <div className="card-name">
              <h5 className="card-title">{p.name}</h5>
            </div>
            <p className="card-text">
            {p.description.substring(0, 10)}...
            </p>
            <div className="card-price">
            <h6 className="card-title">
            {p.price.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
           })}
          </h6>
            </div>
            </div>

              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      <Modal
  title="Filter Products"
  open={isFilterModalVisible}
  onCancel={hideFilterModal}
  footer={[
    <Button key="apply" type="primary" onClick={applyFilters}>
      Apply
    </Button>,
    <Button key="reset" onClick={resetFilters}>
      Reset
    </Button>,
  ]}
>
  <ProductFilter applyFilters={applyFilters} resetFilters={resetFilters} />
</Modal>
 
    </Layout>
  );
};

export default HomePage;