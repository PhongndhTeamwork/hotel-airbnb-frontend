import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faHome,
   faInfoCircle,
   faTools,
   faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Header = () => {
   return (
      <div className="header">
         <div className="header-container">
            <div className="header-list">
               <div className="header-list__item">
                  <FontAwesomeIcon icon={faHome} />
                  <Link to="/customer/">Home</Link>
               </div>
               <div className="header-list__item">
                  <FontAwesomeIcon
                     icon={faInfoCircle}
                     className="header-list__icon"
                  />
                  <Link to="/hotelier/hotels">Hotelier</Link>
               </div>
               <div className="header-list__item">
                  <FontAwesomeIcon
                     icon={faTools}
                     className="header-list__icon"
                  />
                  <Link to="">Services</Link>
               </div>
               <div className="header-list__item">
                  <FontAwesomeIcon
                     icon={faEnvelope}
                     className="header-list__icon"
                  />
                  <Link to="#contact">Contact</Link>
               </div>
            </div>
            <h1 className="header-title">A lifetime of discount?</h1>
            <p className="header-desc">Book right now || be gay</p>
            {/* <Link to="/signin">
               <button className="header-btn">Sign in / Register</button>
            </Link> */}
         </div>
      </div>
   );
};

export default Header;
