import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import { Badge } from "antd";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../Context/Cart";
import { useWishlist } from "../../Context/Wish";
import Categories from "../../pages/CategoryMenu";
import { ShoppingCartOutlined, HeartOutlined, UserOutlined, SearchOutlined} from "@ant-design/icons";


const Header = () => {
  const [cart] = useCart();
  const [wishlist] = useWishlist();
  const [auth, setAuth] = useAuth();
  const [showCategories, setShowCategories] = useState();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("wishlist");
    localStorage.removeItem("cart");
    toast.success("Logout Successfully");
  };

  return (
    <>
    <header>
    <div className="header" style={{marginTop:"0%"}}>
      <div className="first-line">
        <span className="logo">muslin moda</span>
        <span className="search"><SearchInput /></span>
        <span>
        <NavLink to="/wishlist" className="nav-link">
                    <Badge count={wishlist?.length} showZero offset={[10, -5]}>
                      <HeartOutlined />
                    </Badge>
                  </NavLink>
        </span>
        <span>
        <NavLink to="/cart" className="nav-link">
                    <Badge count={cart?.length} showZero offset={[10, -5]}>
                      <ShoppingCartOutlined />
                    </Badge>
                  </NavLink>
        </span>
      </div>
      <div className="second-line">
        <span><NavLink to="/AllProduct" className="nav-link">
                    HOME
                  </NavLink></span>
        <span>
                  <NavLink to="/" className="nav-link">
                    WOMEN
                  </NavLink></span>
        <span>
        {!auth?.user ? (
                
                <NavLink to="/login" className="nav-link">
                  ACCOUNT
                </NavLink>
              
            ) : (
              <div className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  style={{ border: "none" }}
                >
                   {auth?.user?.name}
                </NavLink>

                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="dropdown-item"
                    >
                      ACCOUNT
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="dropdown-item"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
        </span>
      </div>
    </div>
    </header>
    </>
  );
};  

export default Header;