import "./header.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faTools, faEnvelope, faBed, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import Searcher from "../searcher/searcher";
const Header = () => {


   return (
      <div className="header">
         <div className="header-container">

            <div className="header-list">
               <div className="header-list__item">
                  <FontAwesomeIcon icon={faHome} />
                  <a href="#home">Home</a>
               </div>
               <div className="header-list__item">
                  <FontAwesomeIcon icon={faInfoCircle} className="header-list__icon" />
                  <a href="#about">About</a>
               </div>
               <div className="header-list__item">
                  <FontAwesomeIcon icon={faTools} className="header-list__icon" />
                  <a href="#services">Services</a>
               </div>
               <div className="header-list__item">
                  <FontAwesomeIcon icon={faEnvelope} className="header-list__icon" />
                  <a href="#contact">Contact</a>
               </div>

            </div>
            {/* <h1 className="header-title">A lifetime of discount?</h1>
            <p className="header-desc">Book right now || be gay</p>
            <button className="header-btn">Sign in / Register</button> */}

            <Searcher />

         </div>


      </div>

   )
}



export default Header;