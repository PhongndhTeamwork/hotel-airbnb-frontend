import "./App.scss";

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./layouts/header/header";
import Footer from "./layouts/footer/footer";
import Navbar from "./layouts/navbar/navbar";
import Signin from "./pages/signin/signin";
import Signup from "./pages/signup/signup";
import HotelierRoutes from "./routes/hotelierRoutes";
import CustomerRoutes from "./routes/customerRoutes";
import AdminRoutes from "./routes/adminRoutes";
import Success from "./pages/success/success";

const App = () => {
   return (
      <div className="App">
         <div className="App">
            <Header />
            <main>
               <Container
                  style={{
                     maxWidth: "100%",
                     paddingLeft: 0,
                     paddingRight: 0,
                     marginTop: "7rem",
                     minHeight: "100vh",
                  }}
               >
                  <Routes>
                     <Route path="/signin" element={<Signin />} />
                     <Route path="/signup" element={<Signup />} />
                     <Route path="/success" element={<Success />} />
                     <Route path="/*" element={<CustomerRoutes />}></Route>
                     <Route path="/admin/*" element={<AdminRoutes />}></Route>
                     <Route
                        path="/hotelier/*"
                        element={<HotelierRoutes />}
                     ></Route>
                  </Routes>
               </Container>
            </main>
            <Footer />
         </div>
      </div>
   );
};

export default App;
