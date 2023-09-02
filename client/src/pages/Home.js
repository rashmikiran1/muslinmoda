import React, { useState} from "react";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../Context/Auth";
import Slider from "react-slick";
import { Link, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Categories from "./CategoryMenu";
import "./home.css";

import { Typography, Box, styled } from '@mui/material'; 

import { navData } from "./data";
import { alignProperty } from "@mui/material/styles/cssUtils";


const Home = () => {
   const [auth, setAuth] = useAuth();
   const [showHome1, setShowHome1] = useState(false);
   const location = useLocation();
 

   const sliderImages = [
     "/images/mirage.webp",
     "/images/slider.webp",
     "/images/banner.webp",
   ];
 
   const sliderSettings = {
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     slidesToScroll: 1,
     autoplay: true,
     autoplaySpeed: 2000,
     dots: true,
   };

   const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop:'150px',
    overflowX: 'overlay',
    [theme.breakpoints.down('lg')]: {
    }
}))


const Text = styled(Typography)`
    font-size: 10px;
    font-weight: 400;
    justifyContent: 'space-between',
    font-family: inherit,
`;

 
   return (
     <Layout title={"Best Offers"}>
      <Component>
         {
                navData.map(temp => (
                    <Box>
                        <div className="circle-image">
                        <a href={temp.categoryUrl}>
                        <img src={temp.url} alt="nav" style={{  width: 64  }} />
                        </a>
                        </div>
                        <Text style={{marginLeft:"15px"}}>{temp.text}</Text>
                    </Box>
                ))
            }
          </Component>
         <div className="image-container">
       
           <div className="slider-container">
             <Slider {...sliderSettings}>
               {sliderImages.map((image, index) => (
                 <div key={index}>
                   <img src={image} alt={`Slider Image ${index}`} className="slider-image"/>
                 </div>
               ))}
               </Slider>
           </div>
           <h5 style={{color:"rebeccapurple"}}>Explore Saree</h5>
           <div>
           <Link to="/category/saree">
             <img src="\images\dress.webp" alt="Image" style={{width:"100%"}}/>
             </Link>
           </div>
          
          
           <div className="homeimage">
           <Link to="/category/shirts">
             <img src="\images\shirt.webp" alt="Image" />
             </Link>
             <Link to="/category/tops">
             <img src="\images\top.webp" alt="Image"/>
             </Link>
           </div>
           <h6>Explore Latest Collection Of Jumpsuit</h6>
           <div>
           <Link to="/category/jumpsuit">
             <img src="\images\trouser.webp" alt="Image" style={{width:"100%"}} />
             </Link>
           </div>
 
           <div>
           <Link to="/category/dresses">
             <img src="\images\mirage.webp" alt="Image"style={{width:"100%"}} />
             </Link>
           </div>
           <div className="path">
          
        </div>
         </div>
        
     </Layout>
   );
 };
 
 export default Home;
 
