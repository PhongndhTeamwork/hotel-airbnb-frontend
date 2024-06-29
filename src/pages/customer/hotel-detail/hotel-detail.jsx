import "./hotel-detail.scss";

import { useParams } from "react-router-dom";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Row, Col, Image, Button, Form } from "react-bootstrap";
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
import { useSelector } from "react-redux";
import RatingStar from "../../../components/rating-star/rating-star";
import { Person, PersonCircle } from "react-bootstrap-icons";

const HotelDetail = () => {
   const { id } = useParams();
   const { userInformation } = useSelector((state) => state.userLogin);

   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${userInformation?.token}`,
            "Content-Type": "application/json",
         },
      };
   }, [userInformation]);

   // const configFormData = useMemo(() => {
   //    return {
   //       headers: {
   //          Authorization: `Bearer ${userInformation?.token}`,
   //          "Content-Type": "multipart/form-data",
   //       },
   //    };
   // }, [userInformation]);

   const [page, setPage] = useState(1);
   const [hotelRooms, setHotelRooms] = useState([]);

   const [hotel, setHotel] = useState({});
   const [hotelImages, setHotelImages] = useState([]);
   const [services, setServices] = useState([]);
   const [feedback, setFeedback] = useState({
      review: "",
      rating: 5,
   });
   const [allFeedback, setAllFeedback] = useState([]);
   // const [rooms, setRooms] = useState([]);

   const getAllFeedback = useCallback(() => {
      axios
         .get(`/get-feedback/${id}?pageNumber=1&pageSize=1000`, config)
         .then(({ data }) => {
            console.log(data);
            setAllFeedback(data.data);
         })
         .catch((error) => {
            console.error(error);
         });
   }, [config, id]);

   useEffect(() => {
      setHotelRooms([]);
      axios
         .get(`/get-room-as-customer/${id}?pageNumber=1&pageSize=1000`, config)
         .then(({ data }) => {
            console.log(data.data);
            for (let i = 0; i < data.data.length; i++) {
               axios
                  .get(`/get-image/${data.data[i].id}?imageType=1`, config)
                  .then((images) => {
                     setHotelRooms((prevStatus) => [
                        ...prevStatus,
                        { ...data.data[i], images: images.data },
                     ]);
                  })
                  .catch((error) => {
                     console.error(error);
                  });
            }
         })
         .catch((error) => {
            console.error(error);
         });
   }, [config, id]);

   useEffect(() => {
      getAllFeedback();
   }, [getAllFeedback]);

   const handleFeedback = (e) => {
      e.preventDefault();
      axios
         .post("/create-feedback/" + id, feedback, config)
         .then(({ data }) => {
            console.log(data);
            setFeedback({
               review: "",
               rating: 5,
            });
            getAllFeedback();
            alert("Submitted!");
         })
         .catch((error) => {
            console.error(error);
         });
   };

   useEffect(() => {
      axios
         .get("/get-hotel-detail/" + id)
         .then(({ data }) => {
            console.log(data);
            setHotel(data[0]);
         })
         .catch((error) => {
            console.error(error);
         });
   }, [id]);

   useEffect(() => {
      axios
         .get("/get-service-by-hotelier/" + id)
         .then(({ data }) => {
            // console.log(data);
            setServices(data);
         })
         .catch((error) => {
            console.error(error);
         });
   }, [id]);

   useEffect(() => {
      axios
         .get(`/get-image/${id}?imageType=0`, config)
         .then(({ data }) => {
            setHotelImages(data);
         })
         .catch((error) => {
            console.error(error);
         });
   }, [config, id]);

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
                     <p className="text-start">Name : {hotel?.name}</p>
                     <p className="text-start">Address : {hotel?.address}</p>
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
                           {services
                              ?.slice(0, services?.length / 2)
                              .map((amenity, index) => (
                                 // <Amenity key={index} name={amenity} />
                                 <div
                                    key={index}
                                    className="d-flex align-items-center mb-3"
                                 >
                                    <Image
                                       src={`http://localhost:5000/${amenity.image_path}`}
                                       width="24px"
                                    />
                                    <p className="mb-0 ms-4">{amenity.name}</p>
                                 </div>
                              ))}
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                           {services
                              ?.slice(services?.length / 2, services.length - 1)
                              .map((amenity, index) => (
                                 // <Amenity key={index} name={amenity} />
                                 <div
                                    key={index}
                                    className="d-flex align-items-center mb-3"
                                 >
                                    <Image
                                       src={`http://localhost:5000/${amenity.image_path}`}
                                       width="24px"
                                    />
                                    <p className="mb-0 ms-4">{amenity.name}</p>
                                 </div>
                              ))}
                        </Col>
                     </Row>
                     {/* <div className="d-flex justify-content-start mt-2">
                        <Button variant="outline-dark">
                           Show all 20 amenities
                        </Button>
                     </div> */}
                  </div>
               </Col>
               <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  xxl={6}
                  className="hotel-detail__room-card pt-3"
                  style={{ maxHeight: "80vh", overflow: "auto" }}
               >
                  <Row>
                     {hotelRooms.map((room, roomIndex) => (
                        <Col
                           xs={12}
                           sm={12}
                           md={12}
                           lg={12}
                           xl={12}
                           xxl={12}
                           key={roomIndex}
                           className="hotel-detail__room-card"
                           style={{ width: "95%" }}
                        >
                           <RoomCard room={room} id={room.id} />
                        </Col>
                     ))}
                     {/* <Button onClick={() => {console.log(hotelRooms)}}>Click</Button> */}

                     {/* <div className="mt-3 hotel-detail_pagination d-flex justify-content-center">
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
                     </div> */}
                  </Row>
               </Col>
            </Row>
         </div>

         <div className="mt-5">
            <h2 className="text-start">Images</h2>
            <Row className="">
               {hotelImages?.map((image, index) => (
                  <Col
                     key={index}
                     xs={12}
                     sm={6}
                     md={6}
                     lg={3}
                     xl={3}
                     xxl={3}
                     className="mb-3"
                  >
                     <Image
                        src={`http://localhost:5000/${image.image_path}`}
                        width="100%"
                        style={{ aspectRatio: "1/1" }}
                     />
                  </Col>
               ))}
            </Row>
         </div>
         <div className="mt-5 hotel-detail__feedback-container">
            <h4>Feedback</h4>
            <hr />
            <div className="d-flex hotel-detail__feedback-wrap">
               <div className="hotel-detail__feedback mt-2 me-4">
                  {allFeedback.map((feedback, index) => (
                     <div key={index}>
                        <div className="d-flex justify-content-center flex-column">
                           <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                 <PersonCircle size="30px" />
                                 <p className="mb-0 ms-2">{feedback.name}</p>
                              </div>
                              <RatingStar rating={feedback.rating} />
                           </div>
                           <div className="text-start ms-5 mt-2 d-flex justify-content-start" style={{color : "grey"}}>
                              {feedback.review}
                           </div>
                        </div>
                        <hr />
                     </div>
                  ))}
               </div>

               <Form
                  className="hotel-detail__feedback-form mt-2 ms-4"
                  onSubmit={handleFeedback}
               >
                  <Form.Group className="mb-3 text-start">
                     <Form.Label className="text-start">Rating</Form.Label>
                     <Form.Control
                        type="number"
                        required
                        min={1}
                        max={5}
                        value={feedback?.rating}
                        onChange={(e) => {
                           setFeedback({ ...feedback, rating: e.target.value });
                        }}
                     />
                  </Form.Group>
                  <Form.Group className="mb-3 text-start">
                     <Form.Label className="text-start">Review</Form.Label>
                     <Form.Control
                        type="text"
                        as="textarea"
                        rows={4}
                        required
                        value={feedback?.review}
                        onChange={(e) => {
                           setFeedback({ ...feedback, review: e.target.value });
                        }}
                     />
                  </Form.Group>
                  <div>
                     <Button type="submit">Submit</Button>
                  </div>
               </Form>
            </div>
         </div>
      </div>
   );
};

export default HotelDetail;
