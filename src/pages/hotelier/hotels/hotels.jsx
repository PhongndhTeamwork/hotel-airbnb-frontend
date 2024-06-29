import "./hotels.scss";
import HotelImage1 from "../../../assets/images/hotel/hotel1.jpg";
import HotelImage2 from "../../../assets/images/hotel/hotel2.jpg";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "react-bootstrap-icons";
import { useEffect, useMemo, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { PaginationControl } from "react-bootstrap-pagination-control";

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

   const { error, loading, userInformation } = useSelector(
      (state) => state.userLogin
   );

   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${userInformation?.token}`,
            "Content-Type": "application/json",
         },
      };
   }, [userInformation]);

   const navigate = useNavigate();

   const [allHotels, setAllHotels] = useState([]);
   const [pageTotal, setPageTotal] = useState(1);
   const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
      setAllHotels([]);
      axios
         .get("/get-hotel?pageNumber=1&pageSize=4", config)
         .then(({ data }) => {
            // console.log(data);
            setPageTotal(data.pageTotal);
            for (let i = 0; i < data.data.length; i++) {
               axios
                  .get(`/get-image/${data.data[i].id}?imageType=0`, config)
                  .then((images) => {
                     setAllHotels((prevStatus) => [
                        ...prevStatus,
                        { ...data.data[i], images: images.data },
                     ]);
                  })
                  .catch((error) => {
                     console.error(error);
                  });
            }
         })
         .then((error) => {
            console.error(error);
         });
   }, [config]);

   const handleChangePage = (page) => {
      window.scrollTo(0, 0);
      setAllHotels([]);
      axios
         .get(`/get-hotel?pageNumber=${page}&pageSize=4`, config)
         .then(({ data }) => {
            // console.log(data);
            // setAllHotels(data.data);
            for (let i = 0; i < data.data.length; i++) {
               axios
                  .get(`/get-image/${data.data[i].id}?imageType=0`, config)
                  .then((images) => {
                     setAllHotels((prevStatus) => [
                        ...prevStatus,
                        { ...data.data[i], images: images.data },
                     ]);
                  })
                  .catch((error) => {
                     console.error(error);
                  });
            }
         })
         .then((error) => {
            console.error(error);
         });
   };

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
            {allHotels?.map((hotel, hotelIndex) => (
               <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={3}
                  xl={3}
                  xxl={3}
                  key={hotelIndex}
                  className="hotelier-hotels__card mb-4"
                  onClick={() => {
                     navigate("/hotelier/edit-hotel/" + hotel?.id);
                  }}
               >
                  <Image
                     src={
                        hotel.images
                           ? "http://localhost:5000/" +
                             hotel.images[0]?.image_path
                           : HotelImage1
                     }
                     width="100%"
                     style={{ aspectRatio: 1 / 1 }}
                  />
                  <div className="hotelier-hotels__name">
                     <h4
                        className="two-line-restrict"
                        style={{ height: "4rem" }}
                     >
                        {hotel.name}
                     </h4>
                  </div>
               </Col>
            ))}
         </Row>

         <div className="mt-3 home__pagination d-flex justify-content-center">
            <PaginationControl
               page={currentPage}
               between={4}
               total={pageTotal * 12}
               // total={pageTotal}
               limit={12}
               changePage={(page) => {
                  handleChangePage(page);
                  setCurrentPage(page);
               }}
               ellipsis={1}
            />
         </div>
      </div>
   );
};

export default Hotels;
