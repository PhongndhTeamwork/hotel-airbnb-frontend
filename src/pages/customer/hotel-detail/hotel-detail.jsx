import "./hotel-detail.scss";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";

import RoomImage1 from "../../../assets/images/room/room1.jpg";
import RoomImage2 from "../../../assets/images/room/room2.jpg";
import RoomImage3 from "../../../assets/images/room/room3.jpg";
import RoomImage4 from "../../../assets/images/room/room4.jpg";
import RoomImage5 from "../../../assets/images/room/room5.jpg";
import RoomImage6 from "../../../assets/images/room/room6.jpg";
import RoomImage7 from "../../../assets/images/room/room7.jpg";
import RoomImage8 from "../../../assets/images/room/room8.jpg";
import RoomImage9 from "../../../assets/images/room/room9.jpg";
import RoomImage10 from "../../../assets/images/room/room10.jpg";
import RoomImage11 from "../../../assets/images/room/room11.jpg";
import RoomImage12 from "../../../assets/images/room/room12.jpg";
import AvatarImage from "../../../assets/images/tourist2.jpg";

import ServiceList from "../../../components/service-list/service-list";
import RoomCard from "../../../components/room-card/room-card";

import { Avatar } from "@mui/material";
import Amenity from "../../../components/amenity/amenity";
import axios from "axios";

const HotelDetail = () => {
   const { id } = useParams();
   const rooms = [
      {
         images: [RoomImage1, RoomImage6, RoomImage8],
         name: "Tellus id interdum velit",
         description:
            "Tortor at risus viverra adipiscing at in tellus integer. Diam maecenas ultricies mi eget. Massa ultricies mi quis hendrerit dolor magna. ",
         area: 12,
         price: 200,
         rating: 4.5,
         comment: 13,
      },
      {
         images: [RoomImage2, RoomImage12, RoomImage6],
         name: "Tellus id interdum velit",
         description:
            "Tortor at risus viverra adipiscing at in tellus integer. Diam maecenas ultricies mi eget. Massa ultricies mi quis hendrerit dolor magna. ",
         area: 12,
         price: 200,
         rating: 4.1,
         comment: 2,
      },
      {
         images: [RoomImage3, RoomImage4, RoomImage8],
         name: "Tellus id interdum velit",
         description:
            "Tortor at risus viverra adipiscing at in tellus integer. Diam maecenas ultricies mi eget. Massa ultricies mi quis hendrerit dolor magna. ",
         area: 12,
         price: 200,
         rating: 4.8,
         comment: 19,
      },
      {
         images: [RoomImage4, RoomImage6, RoomImage7],
         name: "Tellus id interdum velit",
         description:
            "Tortor at risus viverra adipiscing at in tellus integer. Diam maecenas ultricies mi eget. Massa ultricies mi quis hendrerit dolor magna. ",
         area: 12,
         price: 200,
         rating: 4.9,
         comment: 19,
      },
      {
         images: [RoomImage5, RoomImage8, RoomImage11],
         name: "Tellus id interdum velit",
         description:
            "Tortor at risus viverra adipiscing at in tellus integer. Diam maecenas ultricies mi eget. Massa ultricies mi quis hendrerit dolor magna. ",
         area: 12,
         price: 200,
         rating: 4.1,
         comment: 15,
      },
      // {
      //    images: [RoomImage6, RoomImage9, RoomImage1],
      //    name: "Tellus id interdum velit",
      //    description:
      //       "Tortor at risus viverra adipiscing at in tellus integer. Diam maecenas ultricies mi eget. Massa ultricies mi quis hendrerit dolor magna. ",
      //    area: 12,
      //    price: 200,
      //    rating: 4.15,
      //    comment: 23,
      // },
      // {
      //    images: [RoomImage7, RoomImage5, RoomImage8],
      //    name: "Tellus id interdum velit",
      //    description:
      //       "Tortor at risus viverra adipiscing at in tellus integer. Diam maecenas ultricies mi eget. Massa ultricies mi quis hendrerit dolor magna. ",
      //    area: 12,
      //    price: 200,
      //    rating: 4.3,
      //    comment: 17,
      // },
      // {
      //    images: [RoomImage8, RoomImage3, RoomImage10],
      //    name: "Tellus id interdum velit",
      //    description:
      //       "Tortor at risus viverra adipiscing at in tellus integer. Diam maecenas ultricies mi eget. Massa ultricies mi quis hendrerit dolor magna. ",
      //    area: 12,
      //    price: 200,
      //    rating: 3.8,
      //    comment: 1,
      // },
   ];

   const amenities = [
      "City skyline view",
      "Courtyard view",
      "Mountain view",
      "Cleaning products",
      "Shampoo",
      "Washer",
      "Bed linens",
      "Ethernet connection",
   ];

   const [page, setPage] = useState(1);

   const [hotel, setHotel] = useState({});

   useEffect(() => {
      axios
         .get("/get-hotel-as-customer")
         .then(({ data }) => {})
         .then((error) => {
            console.error(error);
         });
   }, []);

   return (
      <div className="hotel-detail">
         <Row className="hotel-detail__image">
            <Col
               xs={12}
               sm={12}
               md={12}
               lg={4}
               xl={4}
               xxl={4}
               className="hotel-detail__image-left"
            >
               <Image src={RoomImage1} width="100%" />
            </Col>
            <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
               <Row className="hotel-detail__image-middle">
                  <Col
                     xs={12}
                     sm={12}
                     md={12}
                     lg={6}
                     xl={6}
                     xxl={6}
                     className="hotel-detail__col"
                  >
                     <Image src={RoomImage2} width="100%" />
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                     <Image src={RoomImage3} width="100%" />
                  </Col>
                  <Col
                     xs={12}
                     sm={12}
                     md={12}
                     lg={6}
                     xl={6}
                     xxl={6}
                     className="hotel-detail__col"
                  >
                     <Image src={RoomImage4} width="100%" />
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                     <Image src={RoomImage5} width="100%" />
                  </Col>
               </Row>
            </Col>
            <Col
               xs={12}
               sm={12}
               md={12}
               lg={4}
               xl={4}
               xxl={4}
               className="hotel-detail__image-right"
            >
               <Image src={RoomImage6} width="100%" />
            </Col>
         </Row>
         <hr />
         <div className="pt-2">
            <ServiceList />
         </div>

         <div className="hotel-detail__room-card mt-5">
            <Row>
               <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                  <div className="hotel-detail__hotelier mt-0 d-flex align-items-center">
                     <Avatar alt="User Avatar" src={AvatarImage} />
                     <div className="ms-3 text-start">
                        <p className="mb-0" style={{ fontWeight: "bold" }}>
                           Hotelier : Nguyễn Đình Hồng Phong
                        </p>
                        <p
                           className="mb-0"
                           style={{ color: "grey", fontSize: "0.8rem" }}
                        >
                           Experience : 1 year
                        </p>
                     </div>
                  </div>
                  <div className="hotel-detail__description mt-4">
                     <p className="text-start">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.
                     </p>
                  </div>
                  <div className="hotel-detail__map mt-4">
                     <div
                        dangerouslySetInnerHTML={{
                           __html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6264.29191319131!2d105.85658954466157!3d21.001844527814008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad2fce595b03%3A0x92c3078c1050a1df!2zU29jY2Vyc3RvcmUudm4gSGFpIELDoCBUcsawbmcsIEdpw6B5IGLDs25nIMSRw6EgJiBQaOG7pSBraeG7h24gY2jDrW5oIGjDo25n!5e0!3m2!1svi!2s!4v1717437674723!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
                        }}
                     />
                  </div>
                  <div className="hotel-detail__amenity mt-5">
                     <h4 className="text-start">What this place offers</h4>
                     <Row>
                        <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                           {amenities.slice(0, 4).map((amenity, index) => (
                              <Amenity key={index} name={amenity} />
                           ))}
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                           {amenities.slice(4, 8).map((amenity, index) => (
                              <Amenity key={index} name={amenity} />
                           ))}
                        </Col>
                     </Row>
                     <div className="d-flex justify-content-start mt-2">
                        <Button variant="outline-dark">
                           Show all 20 amenities
                        </Button>
                     </div>
                  </div>
               </Col>
               <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  xxl={6}
                  className="hotel-detail__room-card"
               >
                  <Row>
                     {rooms.map((room, roomIndex) => (
                        <Col
                           xs={12}
                           sm={12}
                           md={12}
                           lg={12}
                           xl={12}
                           xxl={12}
                           key={roomIndex}
                           className="hotel-detail__room-card"
                        >
                           <RoomCard room={room} />
                        </Col>
                     ))}
                     <div className="mt-3 hotel-detail_pagination d-flex justify-content-center">
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
                  </Row>
               </Col>
            </Row>
         </div>
      </div>
   );
};

export default HotelDetail;
