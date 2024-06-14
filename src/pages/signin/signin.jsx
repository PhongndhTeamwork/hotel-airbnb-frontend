import "./signin.scss";
import SigninImage from "../../assets/images/tourist1.jpg";
// import Logo1 from "../../assets/logos/logo1.png";
// import Logo3 from "../../assets/logos/logo3.png";
import Logo4 from "../../assets/logos/logo4.png";
import { Spinner } from "react-bootstrap";

import FacebookIcon from "../../assets/icons/facebook.png";
import GoogleIcon from "../../assets/icons/google.png";

import {
   TextField,
   OutlinedInput,
   InputAdornment,
   IconButton,
   InputLabel,
   FormControl,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Image, Row, Col, Button } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/features/userLoginSlice";

const Signin = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {
      error: errorMessage,
      loading,
      userInformation,
   } = useSelector((state) => state.userLogin);

   const [showPassword, setShowPassword] = useState(false);

   const handleClickShowPassword = () => setShowPassword((show) => !show);

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   //? Signin logic
   const [userInfo, setUserInfo] = useState({
      phoneNumber: "",
      password: "",
   });
   const [error, setError] = useState({
      phoneNumber: "",
      password: "",
      auth: ""
   });

   const [isFocus, setIsFocus] = useState({
      phoneNumber: false,
      password: false,
   });

   const handleSignin = () => {
      let isError = false;
      if (userInfo.phoneNumber === "") {
         setError({ ...error, phoneNumber: "Please enter your phone number" });
         isError = true;
      }
      if (userInfo.password === "") {
         setError({ ...error, password: "Please enter your password" });
         isError = true;
      }
      if (isError) return;
      setError({
         name: "",
         phoneNumber: "",
         password: "",
         confirmPassword: "",
      });
      // axios
      //    .post("/signin", {
      //       phone_number: userInfo.phoneNumber,
      //       password: userInfo.password,
      //    })
      //    .then(({ data }) => {
      //       console.log(data);
      //    })
      //    .catch(() => console.log);
      dispatch(
         login({
            phone_number: userInfo.phoneNumber,
            password: userInfo.password,
         })
      );
   };

   useEffect(() => {
      if (userInformation?.role === 0) navigate("/")
      else if (userInformation?.role === 1) navigate("/hotelier/hotels");
      else if (userInformation?.role === 2) navigate("/admin/user-list");
   }, [userInformation, navigate]);

   return (
      <div className="signin">
         <Row>
            <Col
               xs={12}
               sm={12}
               md={6}
               lg={6}
               xl={6}
               xxl={6}
               className="signin__image"
               style={{ backgroundImage: `url(${SigninImage})` }}
            >
               {/* <Image src={SigninImage} width="100%" /> */}
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
               <div className="signin__logo">
                  <Image src={Logo4} />
               </div>
               <div className="signin__form mt-3">
                  <TextField
                     id="outlined-basic"
                     error={
                        (userInfo.phoneNumber === "" && isFocus.phoneNumber) || errorMessage !== null
                           ? true
                           : false
                     }
                     label={
                        userInfo.phoneNumber === "" && isFocus.phoneNumber
                           ? "Please enter phone number" : errorMessage !== null ? "Phone number or password incorrect" 
                           : "Phone Number"
                     }
                     variant="outlined"
                     className="signin__input"
                     onChange={(e) => {
                        setUserInfo({
                           ...userInfo,
                           phoneNumber: e.target.value,
                        });
                        setIsFocus({ ...isFocus, phoneNumber: true });
                     }}
                  />
                  <FormControl
                     sx={{ m: 1, width: "25ch" }}
                     variant="outlined"
                     className="signin__input"
                  >
                     <InputLabel
                        htmlFor="outlined-adornment-password"
                        error={
                           userInfo.password === "" && isFocus.password
                              ? true
                              : false
                        }
                     >
                        {userInfo.password === "" && isFocus.password
                           ? "Please enter password"
                           : "Password"}
                     </InputLabel>
                     <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        error={
                           userInfo.password === "" && isFocus.password
                              ? true
                              : false
                        }
                        onChange={(e) => {
                           setUserInfo({
                              ...userInfo,
                              password: e.target.value,
                           });
                           setIsFocus({ ...isFocus, password: true });
                        }}
                        endAdornment={
                           <InputAdornment position="end">
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={handleClickShowPassword}
                                 onMouseDown={handleMouseDownPassword}
                                 edge="end"
                              >
                                 {showPassword ? (
                                    <VisibilityOff />
                                 ) : (
                                    <Visibility />
                                 )}
                              </IconButton>
                           </InputAdornment>
                        }
                        label={
                           userInfo.password === "" && isFocus.password
                              ? "Please enter password"
                              : "Password"
                        }
                     />
                  </FormControl>
               </div>

               <div
                  className="signin__submit-button mt-2 d-flex justify-content-center"
                  onClick={handleSignin}
               >
                  <Button
                     variant="success"
                     className="d-flex align-items-center justify-content-center"
                  >
                     {/* {loading && (
                        <Fragment>
                           <Spinner
                              style={{ width: "20px", height: "20px" }}
                           ></Spinner>
                           &nbsp;
                           &nbsp;
                        </Fragment>
                     )} */}
                     Sign in
                  </Button>
               </div>
               <div className="signin__line mt-5">
                  <p>Or Continue With</p>
                  <hr style={{ borderTop: "1px solid black", opacity: 1 }} />
               </div>
               <div className="signin__media">
                  <Button variant="light">
                     <Image src={GoogleIcon} width="24px" />
                     Google
                  </Button>
                  <Button variant="light">
                     <Image src={FacebookIcon} width="24px" />
                     Facebook
                  </Button>
               </div>
               <div className="signin__provision">
                  {/* <p>
                     By creating an account, you agree to our terms and
                     conditions.
                  </p> */}
               </div>
            </Col>
         </Row>
      </div>
   );
};

export default Signin;
