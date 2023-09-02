import { useEffect, useState, useContext} from "react";
import { Routes, Route} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contacts";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import {ToastContainer,Toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/Adminroute";
import AdminDashboard from "./pages/Admin/Admindashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import AllProduct from "./pages/AllProduct";
import Searchicon from "./pages/searchicon";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/cartpage";
import WishlistPage from "./pages/WishlistPage";
import CategoryMenu from "./pages/CategoryMenu";
import CategoryProduct from "./pages/CategoryProduct";
import AdminOrders from "./pages/Admin/adminorder";
import PasswordReset from "./pages/Auth/ResetPassword";



function App() {

 
  return (
   
    <>
  
    <Routes>
      <Route path="" element={<Home/>}/>
      <Route path="/wishlist" element={<WishlistPage/>}/>
      <Route path="/category" element={<CategoryMenu/>} />
      <Route path="/category/:slug" element={<CategoryProduct/>} />
      <Route path="/AllProduct" element={<AllProduct/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/product/:slug" element={<ProductDetails/>}/>
      <Route path="/Search" element={<Searchicon/>}/>
      <Route path="/product/:slug" element={<WishlistPage />} />
     
      
      <Route path="/Dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Orders />} />
      </Route>
      <Route path="/Dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/products/:slug" element={<UpdateProduct />} />
        <Route path="admin/Users" element={<Users />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/orders" element={<AdminOrders />} />
        
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ForgotPassword" element={<ForgotPasssword />} />
      <Route path="/PasswordReset" element={<PasswordReset />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Policy" element={<Policy />} />
      <Route path="*" element={<Pagenotfound />} />
    </Routes>

    </>
  
  );
}

export default App;
