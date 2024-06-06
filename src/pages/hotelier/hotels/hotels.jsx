import "./hotels.scss";
import HotelImage1 from "../../../assets/images/hotel/hotel1.jpg";
import HotelImage2 from "../../../assets/images/hotel/hotel2.jpg";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "react-bootstrap-icons";

const Hotels = () => {
   const hotels = [
      {
         name: "Consectetur adipiscing elit",
         description:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
         images: [HotelImage1],
         minPrice: 40,
         maxPrice: 300,
         rating: 4.5,
      },
      {
         name: "Sunt in culpa qui officia",
         description:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ",
         images: [HotelImage2],
         minPrice: 80,
         maxPrice: 280,
         rating: 4.9,
      },
   ];

   const navigate = useNavigate();

   return (
      <div className="hotelier-hotels mb-5">
         <div className="d-flex justify-content-between mb-3">
            <h3 className="text-start mb-0">Your hotels</h3>

            <Button
               variant="outline-success d-flex align-items-center px-4"
               onClick={() => {
                  navigate("/hotelier/add-hotel");
               }}
            >
               <PlusCircle size="20px" /> &nbsp; Add New Hotel
            </Button>
         </div>
         <Row>
            {hotels.map((hotel, hotelIndex) => (
               <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={4}
                  xxl={4}
                  key={hotelIndex}
                  className="hotelier-hotels__card"
                  onClick={() => {
                     navigate("/hotelier/edit-hotel/1");
                  }}
               >
                  <Image src={hotel.images[0]} width="100%" />
                  <div className="hotelier-hotels__name">
                     <h4>{hotel.name}</h4>
                  </div>
               </Col>
            ))}
         </Row>
      </div>
   );
};

export default Hotels;
