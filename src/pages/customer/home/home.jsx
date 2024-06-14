import "./home.scss";
import HotelImage1 from "../../../assets/images/hotel/hotel1.jpg";
import HotelImage2 from "../../../assets/images/hotel/hotel2.jpg";
import HotelImage3 from "../../../assets/images/hotel/hotel3.jpg";
import HotelImage4 from "../../../assets/images/hotel/hotel4.jpg";
import HotelImage5 from "../../../assets/images/hotel/hotel5.jpg";
import HotelImage6 from "../../../assets/images/hotel/hotel6.jpg";
import HotelImage7 from "../../../assets/images/hotel/hotel7.jpg";
import HotelImage8 from "../../../assets/images/hotel/hotel8.jpg";
import HotelImage9 from "../../../assets/images/hotel/hotel9.jpg";
import HotelImage10 from "../../../assets/images/hotel/hotel10.jpg";
import HotelImage11 from "../../../assets/images/hotel/hotel11.jpg";
import HotelImage12 from "../../../assets/images/hotel/hotel12.jpg";

import { Col, Row } from "react-bootstrap";
import HotelCard from "../../../components/hotel-card/hotel-card";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useEffect, useState } from "react";
import SearchBar from "../../../components/search-bar/search-bar";
import axios from "axios";

const hotelInfos = [
   {
      name: "Consectetur adipiscing elit",
      description:
         "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      images: [HotelImage1, HotelImage11, HotelImage12],
      minPrice: 40,
      maxPrice: 300,
      rating: 4.5,
   },
   {
      name: "Sunt in culpa qui officia",
      description:
         "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ",
      images: [HotelImage2, HotelImage3, HotelImage7],
      minPrice: 80,
      maxPrice: 280,
      rating: 4.9,
   },
   {
      name: "Consectetur adipiscing elit",
      description:
         "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      images: [HotelImage3, HotelImage11, HotelImage6],
      minPrice: 90,
      maxPrice: 900,
      rating: 4.1,
   },
   {
      name: "Consectetur adipiscing elit",
      description:
         "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      images: [HotelImage4, HotelImage12, HotelImage4],
      minPrice: 60,
      maxPrice: 200,
      rating: 4.2,
   },
   {
      name: "Consectetur adipiscing elit",
      description:
         "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      images: [HotelImage5, HotelImage10, HotelImage9],
      minPrice: 45,
      maxPrice: 310,
      rating: 4.78,
   },
   {
      name: "Consectetur adipiscing elit",
      description:
         "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      images: [HotelImage6, HotelImage11, HotelImage2],
      minPrice: 120,
      maxPrice: 200,
      rating: 4.56,
   },
   {
      name: "Consectetur adipiscing elit",
      description:
         "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      images: [HotelImage7, HotelImage9, HotelImage1],
      minPrice: 80,
      maxPrice: 400,
      rating: 3.94,
   },
   {
      name: "Consectetur adipiscing elit",
      description:
         "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      images: [HotelImage8, HotelImage2, HotelImage4],
      minPrice: 50,
      maxPrice: 375,
      rating: 4.65,
   },
   {
      name: "Consectetur adipiscing elit",
      description:
         "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      images: [HotelImage9, HotelImage5, HotelImage3],
      minPrice: 90,
      maxPrice: 375,
      rating: 4.95,
   },
   {
      name: "Consectetur adipiscing elit",
      description:
         "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      images: [HotelImage10, HotelImage12, HotelImage6],
      minPrice: 60,
      maxPrice: 315,
      rating: 4.25,
   },
   {
      name: "Consectetur adipiscing elit",
      description:
         "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      images: [HotelImage11, HotelImage5, HotelImage9],
      minPrice: 90,
      maxPrice: 275,
      rating: 4.82,
   },
   {
      name: "Consectetur adipiscing elit",
      description:
         "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      images: [HotelImage12, HotelImage3, HotelImage8],
      minPrice: 40,
      maxPrice: 685,
      rating: 4.15,
   },
];
const Home = () => {
   const [page, setPage] = useState(1);

   const [hotels, setHotels] = useState([]);

   useEffect(() => {
      axios
         .get("/get-hotel-as-customer")
         .then(({ data }) => {})
         .then((error) => {
            console.error(error);
         });
   }, []);

   return (
      <div className="home">
         <div className="home__search-bar d-flex justify-content-center">
            <SearchBar />
         </div>
         <Row>
            {hotelInfos.map((hotel, hotelIndex) => (
               <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  xxl={3}
                  key={hotelIndex}
                  className="home__hotel-card"
               >
                  <HotelCard hotel={hotel} />
               </Col>
            ))}
         </Row>
         <div className="mt-3 home__pagination d-flex justify-content-center">
            <PaginationControl
               page={page}
               between={4}
               total={250}
               limit={20}
               changePage={(page) => {
                  setPage(page);
               }}
               ellipsis={1}
            />
         </div>
      </div>
   );
};

export default Home;