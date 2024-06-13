import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//    faHome,
//    faInfoCircle,
//    faTools,
//    faEnvelope,
// } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
   return (
      <div className="navbar">
         <div className="nav-container">
            <div className="nav-container__logo">Hotella</div>
            <div className="nav-container__btn">
               <Link to="/signup">
                  <button className="nav-btn">Register</button>
               </Link>
               <Link to="/signin">
                  <button className="nav-btn">Login</button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
