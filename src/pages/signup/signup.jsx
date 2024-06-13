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

const Signup = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
   const [isSignupAsHotelier, setIsSignupAsHotelier] = useState(false);
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
      axios
         .post(
            `${
               isSignupAsHotelier
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
         .then(({ data }) => {
            if (data === "Phone number is duplicated") {
               setError({
                  ...error,
                  phoneNumber: "Phone number is duplicated",
               });
            }
            console.log(data);
         })
         .catch(() => console.log);
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
                     id="outlined-basic"
                     label="Phone Number"
                     variant="outlined"
                     className="signup__input"
                     onChange={(e) => {
                        setUserInfo({
                           ...userInfo,
                           phoneNumber: e.target.value,
                        });
                     }}
                  />
                  <TextField
                     id="outlined-basic"
                     label="Name"
                     variant="outlined"
                     className="signup__input"
                     onChange={(e) => {
                        setUserInfo({
                           ...userInfo,
                           name: e.target.value,
                        });
                     }}
                  />
                  <FormControl
                     sx={{ m: 1, width: "25ch" }}
                     variant="outlined"
                     className="signup__input"
                  >
                     <InputLabel htmlFor="outlined-adornment-password">
                        Password
                     </InputLabel>
                     <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => {
                           setUserInfo({
                              ...userInfo,
                              password: e.target.value,
                           });
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
                        label="Password"
                     />
                  </FormControl>
                  <FormControl
                     sx={{ m: 1, width: "25ch" }}
                     variant="outlined"
                     className="signup__input"
                  >
                     <InputLabel htmlFor="outlined-adornment-password">
                        Confirm Password
                     </InputLabel>
                     <OutlinedInput
                        id="outlined-adornment-password"
                        type={showConfirmPassword ? "text" : "password"}
                        onChange={(e) => {
                           setConfirmPassword(e.target.value);
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
                        label="Password"
                     />
                  </FormControl>
                  <div>
                     <input
                        type="checkbox"
                        id="id-hotelier"
                        onChange={(e) => {
                           setIsSignupAsHotelier(e.target.checked);
                        }}
                     />
                     <label for="id-hotelier"> &nbsp;Sign up as hotelier</label>
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
