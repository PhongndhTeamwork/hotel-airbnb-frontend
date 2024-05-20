import "./App.scss";

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import Home from "./routes/home/home";
import Signin from "./routes/signin/signin";
import Signup from "./routes/signup/signup";

const App = () => {
   return (
      <div className="App">
         <div className="App">
            <Navbar />
            <Header />
            <main>
               <Container
                  // className="d-flex justify-content-center"
                  style={{ maxWidth: "100%", paddingLeft: 0, paddingRight: 0 }}
               >
                  <Routes>
                     <Route path="/" element={<Home />} />
                     <Route path="/signin" element={<Signin />} />
                     <Route path="/signup" element={<Signup />} />
                  </Routes>
               </Container>
            </main>
            <Footer />
         </div>
      </div>
   );
};

export default App;
