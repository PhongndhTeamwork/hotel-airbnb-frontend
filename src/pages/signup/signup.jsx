import "./signup.scss";
import SignupImage from "../../assets/images/tourist2.jpg";
import Logo1 from "../../assets/logos/logo1.png";
import Logo3 from "../../assets/logos/logo3.png";
import Logo4 from "../../assets/logos/logo4.png";

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
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const navigate = useNavigate();

   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const handleClickShowConfirmPassword = () =>
      setShowConfirmPassword((show) => !show);

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const handleMouseDownConfirmPassword = (event) => {
      event.preventDefault();
   };

   //? Signup logic
   const [role, setRole] = useState("customer");
   const [userInfo, setUserInfo] = useState({
      name: "",
      phoneNumber: "",
      password: "",
   });
   const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState({
      name: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
   });
   const [isFocus, setIsFocus] = useState({
      name: false,
      phoneNumber: false,
      password: false,
      confirmPassword: false,
   });

   const handleSignup = () => {
      let isError = false;
      if (userInfo.name === "") {
         setError({ ...error, name: "Please enter your username" });
         isError = true;
      }
      if (userInfo.phoneNumber === "") {
         setError({ ...error, phoneNumber: "Please enter your phone number" });
         isError = true;
      }
      if (userInfo.password === "") {
         setError({ ...error, password: "Please enter your password" });
         isError = true;
      }
      if (confirmPassword === "") {
         setError({
            ...error,
            confirmPassword: "Please enter your password confirmation",
         });
         isError = true;
      } else if (confirmPassword !== userInfo.password) {
         setError({
            ...error,
            confirmPassword: "Password is not match",
         });
      }
      if (isError) return;
      setError({
         name: "",
         phoneNumber: "",
         password: "",
         confirmPassword: "",
      });
      // console.log(role);
      axios
         .post(
            `${
               role === "hotelier"
                  ? "/signup-as-hotelier"
                  : "/signup-as-customer"
            }`,
            {
               name: userInfo.name,
               phone_number: userInfo.phoneNumber,
               password: userInfo.password,
               confirmPassword: userInfo.confirmPassword,
            }
         )
         .then((data) => {
            console.log(data);
            navigate("/");
         })
         .catch(({ response }) => {
            console.log(response);
            if (response.data === "phone number is duplicated") {
               setError({ ...error, phoneNumber: response.data });
            }
         });
   };

   const handleRoleChange = (e) => {
      console.log(e.target.value);
      setRole(e.target.value);
   };

   return (
      <div className="signup">
         <Row>
            <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
               <div className="signup__logo">
                  <Image src={Logo4} />
               </div>
               <div className="signup__form mt-3">
                  <TextField
                     error={
                        (userInfo.phoneNumber === ""  &&
                        isFocus.phoneNumber) ||  error.phoneNumber !== "" 
                           ? true
                           : false
                     }
                     id="outlined-basic"
                     label={
                        userInfo.phoneNumber === "" && isFocus.phoneNumber
                           ? "Please enter phone number" : error.phoneNumber !== "" ? "Phone Number is duplicated" 
                           : "Phone Number"
                     }
                     variant="outlined"
                     className="signup__input"
                     onChange={(e) => {
                        setIsFocus({ ...isFocus, phoneNumber: true });
                        setUserInfo({
                           ...userInfo,
                           phoneNumber: e.target.value,
                        });
                     }}
                  />
                  <TextField
                     id="outlined-basic"
                     error={userInfo.name === "" && isFocus.name ? true : false}
                     label={
                        userInfo.name === "" && isFocus.name
                           ? "Please enter name"
                           : "Name"
                     }
                     variant="outlined"
                     className="signup__input"
                     onChange={(e) => {
                        setUserInfo({
                           ...userInfo,
                           name: e.target.value,
                        });
                        setIsFocus({ ...isFocus, name: true });
                     }}
                  />
                  <FormControl
                     sx={{ m: 1, width: "25ch" }}
                     variant="outlined"
                     className="signup__input"
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
                        error={
                           userInfo.password === "" && isFocus.password
                              ? true
                              : false
                        }
                        type={showPassword ? "text" : "password"}
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
                              : "Password: "
                        }
                     />
                  </FormControl>
                  <FormControl
                     sx={{ m: 1, width: "25ch" }}
                     variant="outlined"
                     className="signup__input"
                  >
                     <InputLabel
                        htmlFor="outlined-adornment-password"
                        error={
                           confirmPassword === "" && isFocus.confirmPassword
                              ? true
                              : false
                        }
                     >
                        {confirmPassword === "" && isFocus.confirmPassword
                           ? "Please reenter password"
                           : "Confirm Password"}
                     </InputLabel>
                     <OutlinedInput
                        id="outlined-adornment-password"
                        type={showConfirmPassword ? "text" : "password"}
                        error={
                           confirmPassword === "" && isFocus.confirmPassword
                              ? true
                              : false
                        }
                        onChange={(e) => {
                           setConfirmPassword(e.target.value);
                           setIsFocus({ ...isFocus, confirmPassword: true });
                        }}
                        endAdornment={
                           <InputAdornment position="end">
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={handleClickShowConfirmPassword}
                                 onMouseDown={handleMouseDownConfirmPassword}
                                 edge="end"
                              >
                                 {showConfirmPassword ? (
                                    <VisibilityOff />
                                 ) : (
                                    <Visibility />
                                 )}
                              </IconButton>
                           </InputAdornment>
                        }
                        label={
                           confirmPassword === "" && isFocus.confirmPassword
                              ? "Please reenter password"
                              : "Confirm Password"
                        }
                     />
                  </FormControl>
                  <div className="d-flex justify-content-center">
                     <div className="mx-3 d-flex align-items-center">
                        <input
                           type="radio"
                           id="id-customer"
                           name="role"
                           value="customer" // Assign a value to this radio button
                           onChange={handleRoleChange}
                           checked={role === "customer"}
                        />
                        <label
                           for="id-customer"
                           style={{ position: "relative", bottom: "1px" }}
                        >
                           &nbsp;Sign up as customer
                        </label>
                     </div>
                     <div className="mx-3 d-flex align-items-center">
                        <input
                           type="radio"
                           id="id-hotelier"
                           name="role"
                           value="hotelier" // Assign a value to this radio button
                           checked={role === "hotelier"}
                           onChange={handleRoleChange}
                        />
                        <label for="id-hotelier">
                           &nbsp;Sign up as hotelier
                        </label>
                     </div>
                  </div>
               </div>
               <div
                  className="signup__submit-button mt-4"
                  onClick={handleSignup}
               >
                  <Button variant="success">Sign up</Button>
               </div>
               <div className="signup__line mt-5">
                  <p>Or Continue With</p>
                  <hr style={{ borderTop: "1px solid black", opacity: 1 }} />
               </div>
               <div className="signup__media">
                  <Button variant="light">
                     <Image src={GoogleIcon} width="24px" />
                     Google
                  </Button>
                  <Button variant="light">
                     <Image src={FacebookIcon} width="24px" />
                     Facebook
                  </Button>
               </div>
               <div className="signup__provision">
                  <p>
                     By creating an account, you agree to our terms and
                     conditions.
                  </p>
               </div>
            </Col>
            <Col
               xs={12}
               sm={12}
               md={6}
               lg={6}
               xl={6}
               xxl={6}
               className="signup__image"
               style={{ backgroundImage: `url(${SignupImage})` }}
            >
               {/* <Image src={SigninImage} width="100%" /> */}
            </Col>
         </Row>
      </div>
   );
};

export default Signup;
