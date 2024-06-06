import "./App.scss";

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./layouts/header/header";
import Footer from "./layouts/footer/footer";
import Navbar from "./components/navbar/navbar";
import Signin from "./pages/signin/signin";
import Signup from "./pages/signup/signup";
import HotelierRoutes from "./routes/hotelierRoutes";
import CustomerRoutes from "./routes/customerRoutes";

const App = () => {
   return (
      <div className="App">
         <div className="App">
            <Navbar />
            <Header />
            <main>
               <Container
                  style={{ maxWidth: "100%", paddingLeft: 0, paddingRight: 0 }}
               >
                  <Routes>
                     <Route path="/signin" element={<Signin />} />
                     <Route path="/signup" element={<Signup />} />
                     <Route path="/customer/*" element={<CustomerRoutes />}></Route>
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
