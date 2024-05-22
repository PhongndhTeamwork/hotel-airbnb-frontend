import "./hotel-detail.scss";

import { useParams } from "react-router-dom";

import { Row, Col, Image } from "react-bootstrap";

import RoomImage1 from "../../assets/images/room/room1.jpg";
import RoomImage2 from "../../assets/images/room/room2.jpg";
import RoomImage3 from "../../assets/images/room/room3.jpg";
import RoomImage4 from "../../assets/images/room/room4.jpg";
import RoomImage5 from "../../assets/images/room/room5.jpg";
import RoomImage6 from "../../assets/images/room/room6.jpg";
import RoomImage7 from "../../assets/images/room/room7.jpg";
import RoomImage8 from "../../assets/images/room/room8.jpg";
import RoomImage9 from "../../assets/images/room/room9.jpg";
import RoomImage10 from "../../assets/images/room/room10.jpg";
import RoomImage11 from "../../assets/images/room/room11.jpg";
import RoomImage12 from "../../assets/images/room/room12.jpg";

import { PaginationControl } from "react-bootstrap-pagination-control";

import Service from "../service/service";
import RoomCard from "../room-card/room-card";
import { useState } from "react";

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
      {
         images: [RoomImage6, RoomImage9, RoomImage1],
         name: "Tellus id interdum velit",
         description:
            "Tortor at risus viverra adipiscing at in tellus integer. Diam maecenas ultricies mi eget. Massa ultricies mi quis hendrerit dolor magna. ",
         area: 12,
         price: 200,
         rating: 4.15,
         comment: 23,
      },
      {
         images: [RoomImage7, RoomImage5, RoomImage8],
         name: "Tellus id interdum velit",
         description:
            "Tortor at risus viverra adipiscing at in tellus integer. Diam maecenas ultricies mi eget. Massa ultricies mi quis hendrerit dolor magna. ",
         area: 12,
         price: 200,
         rating: 4.3,
         comment: 17,
      },
      {
         images: [RoomImage8, RoomImage3, RoomImage10],
         name: "Tellus id interdum velit",
         description:
            "Tortor at risus viverra adipiscing at in tellus integer. Diam maecenas ultricies mi eget. Massa ultricies mi quis hendrerit dolor magna. ",
         area: 12,
         price: 200,
         rating: 3.8,
         comment: 1,
      },
   ];

   const [page, setPage] = useState(1);


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
            <Service />
         </div>
         <div className="hotel-detail__room-card mt-5">
            <Row>
               {rooms.map((room, roomIndex) => (
                  <Col
                     xs={12}
                     sm={12}
                     md={12}
                     lg={6}
                     xl={6}
                     xxl={6}
                     key={roomIndex}
                     className="hotel-detail__room-card"
                  >
                     <RoomCard room={room} />
                  </Col>
               ))}
            </Row>
         </div>
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
      </div>
   );
};

export default HotelDetail;
