import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faHome,
   faInfoCircle,
   faTools,
   faEnvelope,
   faCloudMeatball
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import Logo1 from "../../assets/logos/logo4.png";
import { PersonCircle, List } from "react-bootstrap-icons";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/features/userLoginSlice";

const Header = () => {
   const [isOpenDropdown, setIsOpenDropdown] = useState();
   const [isActive, setIsActive] = useState(false);
   const {
      error: errorMessage,
      loading,
      userInformation,
   } = useSelector((state) => state.userLogin);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 0) {
            setIsActive(true);
         } else {
            setIsActive(false);
         }
      };

      window.addEventListener("scroll", handleScroll);

      // Cleanup the event listener on component unmount
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return (
      <div className={`header ${isActive ? "active" : ""}`}>
         <div className="header-container">
            <div
               className="header-logo"
               onClick={() => {
                  navigate("/");
               }}
            >
               <Image src={Logo1} width="70px" />
            </div>

            <div className="header-list">
               {userInformation?.role === 0 && (
                  <Fragment>
                     <div className="header-list__item">
                        <FontAwesomeIcon icon={faHome} />
                        <Link to="/">Home</Link>
                     </div>
                     <div className="header-list__item">
                        <FontAwesomeIcon
                           icon={faInfoCircle}
                           className="header-list__icon"
                        />
                        <Link to="/booked">Booked</Link>
                     </div>
                  </Fragment>
               )}
               {userInformation?.role === 1 && (
                  <Fragment>
                     <div className="header-list__item">
                        <FontAwesomeIcon
                           icon={faInfoCircle}
                           className="header-list__icon"
                        />
                        <Link to="/hotelier/hotels">Home</Link>
                     </div>
                     <div className="header-list__item">
                        <FontAwesomeIcon
                           icon={faCloudMeatball}
                           className="header-list__icon"
                        />
                        <Link to="/hotelier/booked">Booked</Link>
                     </div>
                  </Fragment>
               )}
               {userInformation?.role === 2 && (
                  <Fragment>
                     <div className="header-list__item">
                        <FontAwesomeIcon
                           icon={faTools}
                           className="header-list__icon"
                        />
                        <Link to="/admin/user-list">Users</Link>
                     </div>
                     <div className="header-list__item">
                        <FontAwesomeIcon
                           icon={faTools}
                           className="header-list__icon"
                        />
                        <Link to="/admin/amenity">Amenities</Link>
                     </div>
                  </Fragment>
               )}
               {!userInformation && (
                  <Fragment>
                     <div className="header-list__item">
                        <FontAwesomeIcon icon={faHome} />
                        <Link to="/">Home</Link>
                     </div>
                     <div className="header-list__item">
                        <FontAwesomeIcon
                           icon={faEnvelope}
                           className="header-list__icon"
                        />
                        <Link to="#contact">Contact</Link>
                     </div>
                  </Fragment>
               )}
            </div>
            <div className="header-auth">
               <List
                  size="30px"
                  className="header-auth__list"
                  onClick={() => {
                     setIsOpenDropdown(!isOpenDropdown);
                  }}
               />
               <PersonCircle size="30px" fill="grey" />
            </div>
            <div
               className="header__dropdown"
               style={{ visibility: isOpenDropdown ? "visible" : "hidden" }}
            >
               {!userInformation && (
                  <Fragment>
                     <p
                        style={{
                           borderTopLeftRadius: "0.25rem",
                           borderTopRightRadius: "0.25rem",
                        }}
                        onClick={() => {
                           navigate("/signin");
                           setIsOpenDropdown(false);
                        }}
                     >
                        Sign in
                     </p>
                     <p
                        onClick={() => {
                           navigate("/signup");
                           setIsOpenDropdown(false);
                        }}
                     >
                        Sign up
                     </p>
                  </Fragment>
               )}
               {userInformation && (
                  <Fragment>
                     <p
                        style={{
                           borderBottomLeftRadius: "0.25rem",
                           borderBottomRightRadius: "0.25rem",
                        }}
                        onClick={() => {
                           navigate("/profile")
                           setIsOpenDropdown(false);
                        }}
                     >
                        Profile
                     </p>
                     <p
                        style={{
                           borderBottomLeftRadius: "0.25rem",
                           borderBottomRightRadius: "0.25rem",
                        }}
                        onClick={() => {
                           setIsOpenDropdown(false);
                        }}
                     >
                        History
                     </p>
                     <p
                        style={{
                           borderBottomLeftRadius: "0.25rem",
                           borderBottomRightRadius: "0.25rem",
                        }}
                        onClick={async () => {
                           setIsOpenDropdown(false);
                           await dispatch(logout());
                           navigate("/");
                        }}
                     >
                        Log out
                     </p>
                  </Fragment>
               )}
            </div>
         </div>
      </div>
   );
};

export default Header;
