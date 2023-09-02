import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useParams, useNavigate, useLocation} from "react-router-dom";
import { Prices } from "../components/Prices";
import toast from "react-hot-toast";
import { useCart } from "../Context/Cart";
import "../Styles/ProductDetails.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [product, setProduct] = useState({});
  const [cartItems, setCartItems] = useCart ([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const location = useLocation();
  const [showSizeGuide, setShowSizeGuide] = useState(false);


  const handleSizeGuideClick = () => {
    setShowSizeGuide(true);
  };

  const handleCloseSizeGuide = () => {
    setShowSizeGuide(false);
  };

  const squares = document.querySelectorAll('.square');

squares.forEach(square => {
  square.addEventListener('click', () => {
    squares.forEach(s => s.classList.remove('selected'));
    square.classList.add('selected');
  });
});

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/cart`,
        {
          user: "648f22cc5a483848cc432c5c",
          product:product._id
        }
      );
      setCartItems(response.data);
      toast.success("Item added to cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add item to cart");
    }
  };

  return (
    <Layout>
   <div className="container product-details">
  <div className="row">
    <div className="col">
      <div id="productCarousel" className="carousel slide" data-bs-ride="carousel" style={{width:"100%"}} >
        <div className="carousel-inner">
          <h5>Home{location.pathname}</h5>
          <div className="carousel-item active">
            <img
              src={`http://localhost:8080/api/v1/product-photo/${product._id}`}
              className="d-block w-100"
              alt={product.name}
              height="600"
              width={"100%"}
            />
          </div>
          <div className="carousel-item">
            <img
              src={`http://localhost:8080/api/v1/product-photo1/${product._id}`}
              className="d-block" 
              alt={product.name}
              height="600" 
              width={"100%"}
              
            />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div className="col-md-6  align-items-center justify-content-center">
    <div className="col product-details-info">
  <div className="d-flex flex-column align-items-center items">
    <h5 className="text-center text-uppercase ">{product.name}</h5>
    <h5 className="text-center text-uppercase">{product.description}</h5>
    <h6 className="text-center text-uppercase">
      {product.price?.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
    </h6>
    <h7 className="text-center">(Incl. of all taxes)</h7>
    <p className="text-center text-decoration-underline mb-0" onClick={handleSizeGuideClick} style={{cursor:"pointer"}}>Size Guide</p>
    <h7 className="text-center mb-0 ">Select Size</h7>
    <div class="square-container">
  <div class="square text-center">XS</div>
  <div class="square text-center">S</div>
  <div class="square text-center">M</div>
  <div class="square text-center">L</div>
  <div class="square text-center">XL</div>
  <div class="square text-center">XXL</div>
</div>

    <Modal show={showSizeGuide} onHide={handleCloseSizeGuide}>
        <Modal.Header closeButton>
          <Modal.Title>Size Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          <p>Cross-check with your body measurement displayed below, measure your body using a measuring tape.
          </p>
          <p className="text-center"><b>unit in centimeters</b></p>
          <Modal.Body>
        <div className="container-fluid">
          <div className="row size-guide-row">
            <div className="col size-guide-col">Size</div>
            <div className="col size-guide-col">Shoulder</div>
            <div className="col size-guide-col">Chest</div>
            <div className="col size-guide-col">Waist</div>
            <div className="col size-guide-col">Hip</div>
          </div>
          <div className="row size-guide-row">
            <div className="col size-guide-col">XS</div>
            <div className="col size-guide-col">15</div>
            <div className="col size-guide-col">32</div>
            <div className="col size-guide-col">37</div>
            <div className="col size-guide-col">38</div>
          </div>
          <div className="row size-guide-row">
            <div className="col size-guide-col">XS</div>
            <div className="col size-guide-col">15</div>
            <div className="col size-guide-col">32</div>
            <div className="col size-guide-col">37</div>
            <div className="col size-guide-col">38</div>
          </div>
          <div className="row size-guide-row">
            <div className="col size-guide-col">XS</div>
            <div className="col size-guide-col">15</div>
            <div className="col size-guide-col">32</div>
            <div className="col size-guide-col">37</div>
            <div className="col size-guide-col">38</div>
          </div>
          <div className="row size-guide-row">
            <div className="col size-guide-col">XS</div>
            <div className="col size-guide-col">15</div>
            <div className="col size-guide-col">32</div>
            <div className="col size-guide-col">37</div>
            <div className="col size-guide-col">38</div>
          </div>
          <div className="row size-guide-row">
            <div className="col size-guide-col">XS</div>
            <div className="col size-guide-col">15</div>
            <div className="col size-guide-col">32</div>
            <div className="col size-guide-col">37</div>
            <div className="col size-guide-col">38</div>
          </div>
          <div className="row size-guide-row">
            <div className="col size-guide-col">XS</div>
            <div className="col size-guide-col">15</div>
            <div className="col size-guide-col">32</div>
            <div className="col size-guide-col">37</div>
            <div className="col size-guide-col">38</div>
          </div>
        </div>
      </Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSizeGuide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    <div style={{width:"100%"}}>
  <button className="btn btn-border rounded-0" style={{width:"40%"}}
   onClick={addToCart}
   
  >ADD TO CART</button>
  <button className="btn btn-border rounded-0" style={{width:"40%"}}>BUY IT NOW</button>
</div>

  </div>
</div>
</div>
  </div>
</div>

      <div className="row container similar-products">
        <h4>Similar Products ...</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap" style={{width:"100%"}}>
          {relatedProducts?.map((p) => (
            <div className="col-6 col-md-3" key={p._id}>
              <img
                src={`http://localhost:8080/api/v1/product-photo/${p._id}`}
                className="card-img-top" onClick={() => navigate(`/product/${p.slug}`)}
                alt={p.name}
                width={"300px"}
                height={"300px"}
                
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 30)}...
                </p>
               
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </Layout>
  );
};

export default ProductDetails;