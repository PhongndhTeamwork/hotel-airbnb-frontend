import "./App.scss";

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./routes/header/header";
import Footer from "./routes/footer/footer";
import Home from "./routes/home/home";
import Navbar from "./routes/navbar/navbar";

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
              
                  </Routes>
               </Container>
            </main>
            <Footer />
         </div>
      </div>
   );
};

export default App;
