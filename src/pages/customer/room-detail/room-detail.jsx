import { useParams } from "react-router-dom";
import "./room-detail.scss";
import { Col, Image, Row } from "react-bootstrap";

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
import { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "react-bootstrap-icons";
import axios from "axios";

import OrderCard from "../../../components/order-card/order-card";

const roomInfo = {
   images: [
      RoomImage1,
      RoomImage2,
      RoomImage3,
      RoomImage4,
      RoomImage5,
      RoomImage6,
      RoomImage7,
      RoomImage8,
      RoomImage9,
      RoomImage10,
      RoomImage11,
      RoomImage12,
   ],
   name: "Tellus id interdum velit",
   description:
      "Tortor at risus viverra adipiscing at in tellus integer. Diam maecenas ultricies mi eget. Massa ultricies mi quis hendrerit dolor magna. ",
   area: 12,
   price: 200,
   rating: 4.5,
   comment: 13,
};


const RoomDetail = () => {
   const { id } = useParams();

   const movePixelSize = 250;

   const imagesListWrapRef = useRef(null);
   const imagesListRef = useRef(null);

   const [serviceBodyWidth, setServiceBodyWidth] = useState(0);
   const [serviceItemsWidth, setServiceItemsWidth] = useState(0);

   const [mainImage1, setMainImage1] = useState(room.images[0]);
   const [mainImage2, setMainImage2] = useState(room.images[1]);

   useEffect(() => {
      setServiceBodyWidth(imagesListWrapRef.current.offsetWidth);
      setServiceItemsWidth(imagesListRef.current.offsetWidth);
   }, [imagesListWrapRef, imagesListRef]);

   const handleClickLeftChevron = () => {
      const currentTranslateX = getTranslateX(imagesListRef.current);
      if (movePixelSize + currentTranslateX < 0) {
         imagesListRef.current.style.transform = `translateX(${
            movePixelSize + currentTranslateX
         }px)`;
      } else {
         imagesListRef.current.style.transform = `translateX(${0}px)`;
      }
   };

   const handleClickRightChevron = () => {
      const currentTranslateX = getTranslateX(imagesListRef.current);
      if (
         -movePixelSize + currentTranslateX >
         serviceBodyWidth - serviceItemsWidth
      ) {
         imagesListRef.current.style.transform = `translateX(${
            -movePixelSize + currentTranslateX
         }px)`;
      } else {
         imagesListRef.current.style.transform = `translateX(${
            serviceBodyWidth - serviceItemsWidth
         }px)`;
      }
   };

   const getTranslateX = (element) => {
      const style = window.getComputedStyle(element);
      const transform = style.transform || style.mozTransform;

      if (transform && transform !== "none") {
         const matrix = new DOMMatrixReadOnly(transform);
         return matrix.m41; // m41 is the `translateX` value in the matrix
      }
      return 0; // Default to 0 if there's no transform
   };


   const [room, setRoom] = useState({});

   useEffect(() => {
      axios
         .get("/get-hotel-as-customer")
         .then(({ data }) => {})
         .then((error) => {
            console.error(error);
         });
   }, []);

   return (
      <div className="room-detail">
         <div className="room-details__main-image">
            <Image src={mainImage1} width="30%" />
            <Image src={mainImage2} width="30%" />
         </div>
         <div className="room-detail__images">
            <div></div>
            <div className="d-flex align-items-center">
               <ChevronLeft
                  size="32px"
                  className="me-3 room-detail__chevron"
                  onClick={() => {
                     handleClickLeftChevron();
                  }}
               />
               <div
                  className="d-flex room-detail__images-list-wrap"
                  ref={imagesListWrapRef}
               >
                  <div
                     className="d-flex room-detail__images-list"
                     ref={imagesListRef}
                  >
                     {roomInfo.images.map((image, index) => (
                        <div key={index}>
                           <Image
                              src={image}
                              width="128px"
                              onClick={() => {
                                 setMainImage1(mainImage2);
                                 setMainImage2(image);
                              }}
                           />
                        </div>
                     ))}
                  </div>
               </div>
               <ChevronRight
                  size="32px"
                  className="ms-3 room-detail__chevron"
                  onClick={() => {
                     handleClickRightChevron();
                  }}
               />
            </div>
         </div>
         <div className="mt-5">
            <Row>
               <Col xs={12} sm={12} md={6} lg={8} xl={8} xxl={8}></Col>
               <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={4}>
                  <OrderCard />
               </Col>
            </Row>
         </div>
      </div>
   );
};

export default RoomDetail;
