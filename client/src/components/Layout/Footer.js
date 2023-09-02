import react from "react";
import { Link } from "react-router-dom";
 const Footers = () =>{
    return (
        <div className="footer">
            <p ><b>Get Our Newsletter</b></p>
            <p>Subscribe to receive update, access to exclusive deals, and more.</p>
            <input type="email"  placeholder="Enter your email address" className="placeholder-input" />
            <br /> {/* Line break */}
           <button className="subscribe-button">Subscribe</button>
           <div className="line" />
           <p className="para">Call +9100000000</p>
           <div className="line" />
           <p className="para">Return/Exchange</p>
           <div className="line" />
           <p className="para"><Link to="/about">About Us</Link></p>
           <div className="line" />
           <p className="para">Follow Us</p>
           <div className="footercontainer">
           <Link to ="https://www.facebook.com/rashmi.kiran.942">
           <img src="/images/facebook.png" alt="Facebook" className="image" />
           </Link>
           <Link to ="https://twitter.com/rashmi@rashmikiran55">
           <img src="/images/twitter.png" alt="Twitter" className="image" />
           </Link>
           <Link to ="https://instagram.com/youraccout">
           <img src="/images/instagram.png" alt="Instagram" className="image" />
           </Link>
           </div>
            <p className="text-center mt-3">
                
                <Link to="/contact">Contact</Link>|
                <Link to="/policy">PrivacyPolicy</Link>
            </p>
        </div>
    )
 }

export default Footers;