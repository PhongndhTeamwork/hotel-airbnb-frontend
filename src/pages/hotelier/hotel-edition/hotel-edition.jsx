import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./hotel-edition.scss";
import { Button, TextField } from "@mui/material/";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { PlusCircle, DashCircle } from "react-bootstrap-icons";
import { Col, Form, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
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
import axios from "axios";
import { useSelector } from "react-redux";

const animatedComponents = makeAnimated();

// const services = [
//    {
//       value: "City skyline view",
//       label: "City skyline view",
//    },
//    {
//       value: "Courtyard view",
//       label: "Courtyard view",
//    },
//    {
//       value: "Mountain view",
//       label: "Mountain view",
//    },
//    {
//       value: "Cleaning products",
//       label: "Cleaning products",
//    },
//    {
//       value: "Shampoo",
//       label: "Shampoo",
//    },
//    {
//       value: "Free dryer",
//       label: "Free dryer",
//    },
//    {
//       value: "Hangers",
//       label: "Hangers",
//    },
//    {
//       value: "Bed linens",
//       label: "Bed linens",
//    },
//    {
//       value: "Ethernet connection",
//       label: "Ethernet connection",
//    },
//    {
//       value: "Exercise equipment",
//       label: "Exercise equipment",
//    },
//    {
//       value: "Books and reading material",
//       label: "Books and reading material",
//    },
//    {
//       value: "Clothing storage",
//       label: "Clothing storage",
//    },
//    {
//       value: "Ceiling fan",
//       label: "Ceiling fan",
//    },
//    {
//       value: "Portable fans",
//       label: "Portable fans",
//    },
//    {
//       value: "Exterior security cameras",
//       label: "Exterior security cameras",
//    },
//    {
//       value: "Fire extinguisher",
//       label: "Fire extinguisher",
//    },
//    {
//       value: "First aid kit",
//       label: "First aid kit",
//    },
//    {
//       value: "Wifi",
//       label: "Wifi",
//    },
//    {
//       value: "Dedicated workspace",
//       label: "Dedicated workspace",
//    },
//    {
//       value: "Kitchen",
//       label: "Kitchen",
//    },
//    {
//       value: "Refrigerator",
//       label: "Refrigerator",
//    },
//    {
//       value: "Microwave",
//       label: "Microwave",
//    },
//    {
//       value: "Stove",
//       label: "Stove",
//    },
//    {
//       value: "Dedicated workspace",
//       label: "Dedicated workspace",
//    },
//    {
//       value: "Toaster",
//       label: "Toaster",
//    },
//    {
//       value: "Free parking on premises",
//       label: "Free parking on premises",
//    },
//    {
//       value: "Barbecue utensils",
//       label: "Barbecue utensils",
//    },
//    {
//       value: "Shared pool",
//       label: "Shared pool",
//    },
//    {
//       value: "EV charger",
//       label: "EV charger",
//    },
//    {
//       value: "Pets allowed",
//       label: "Pets allowed",
//    },
//    {
//       value: "Breakfast Buffet",
//       label: "Breakfast Buffet",
//    },
//    {
//       value: "Smoking allowed",
//       label: "Smoking allowed",
//    },
//    {
//       value: "Cleaning available during stay",
//       label: "Cleaning available during stay",
//    },
//    {
//       value: "Iron",
//       label: "Iron",
//    },
//    {
//       value: "Hot water kettle",
//       label: "Hot water kettle",
//    },
// ];

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

const stars = [
   {
      value: 1,
      label: 1,
   },
   {
      value: 2,
      label: 2,
   },
   {
      value: 3,
      label: 3,
   },
   {
      value: 4,
      label: 4,
   },
   {
      value: 5,
      label: 5,
   },
];

const HotelEdition = () => {
   const [location, setLocation] = useState("");
   const { id } = useParams();
   const navigate = useNavigate();
   const formRef = useRef();

   const { error, loading, userInformation } = useSelector(
      (state) => state.userLogin
   );

   const [services, setServices] = useState([]);

   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${userInformation?.token}`,
            "Content-Type": "application/json",
         },
      };
   }, [userInformation]);

   const configFormData = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${userInformation?.token}`,
            "Content-Type": "multipart/form-data",
         },
      };
   }, [userInformation]);

   const [numberOfImage, setNumberOfImage] = useState(3);
   const [images, setImages] = useState([]);

   const [hotel, setHotel] = useState({});
   const [hotelServices, setHotelServices] = useState([]);
   const [remainServices, setRemainServices] = useState([]);
   const [hotelImages, setHotelImages] = useState([]);
   const [newImage, setNewImage] = useState([]);

   const [hotelRooms, setHotelRooms] = useState([]);

   useEffect(() => {
      axios
         .get(`/get-room/${id}?pageNumber=1&pageSize=1000`, config)
         .then(({ data }) => {
            console.log(data.data);
           setHotelRooms(data.data);
         })
         .catch((error) => {
            console.error(error);
         });
   },[config, id]);


   useEffect(() => {
      axios
         .get("/get-service", config)
         .then(({ data }) => {
            // console.log(data);
            setServices(
               data?.map((service) => {
                  return {
                     value: service.id,
                     label: service.name,
                  };
               })
            );
         })
         .catch((error) => {
            console.error(error);
         });
   }, [config]);

   const getHotelInfo = useCallback(() => {
      axios
         .get(`/get-service-by-hotelier/${id}`, config)
         .then(({ data }) => {
            console.log(data);
            setHotelServices(data);
         })
         .catch((error) => {
            console.error(error);
         });
   }, [config, id]);

   useState(() => {
      axios
         .get(`/get-image/${id}?imageType=0`, config)
         .then(({ data }) => {
            console.log(data);
            setHotelImages(data);
            setImages(data);
            setNumberOfImage(data.length);
         })
         .catch((error) => {
            console.error(error);
         });
   }, []);

   useEffect(() => {
      axios
         .get(`/get-image/${id}?imageType=0`, config)
         .then(({ data }) => {
            console.log(data);
         })
         .catch((error) => {
            console.error(error);
         });
   }, [config, id]);

   useEffect(() => {
      axios
         .get(`/get-hotel-detail/${id}`, config)
         .then(({ data }) => {
            console.log(data);
            setHotel(data[0]);
         })
         .catch((error) => {
            console.error(error);
         });
   }, [config, hotel?.star, id]);

   useEffect(() => {
      getHotelInfo();
   }, [getHotelInfo]);

   // useEffect(() => {
   //    axios
   //       .get("/get-hotel-as-customer")
   //       .then(({ data }) => {})
   //       .then((error) => {
   //          console.error(error);
   //       });
   // }, []);

   const handleChangeImage = (e, index) => {
      const file = e.target.files[0];
      if (file) {
         const imageURL = URL.createObjectURL(file);
         setNewImage({
            path: imageURL,
            file: file,
         });
      }
      // imagesTemp[index].file = file;
      // setImages(imagesTemp);
   };

   const handleUpdateHotel = () => {
      console.log(images);
      console.log(hotel);
   };

   const handleUpdateBasicInformation = () => {
      let hotelInfoRequest = { ...hotel };
      delete hotelInfoRequest.services;
      axios
         .put(`/update-hotel/${id}`, hotelInfoRequest, config)
         .then(() => {
            getHotelInfo();
            alert("Update basic information successfully!");
         })
         .catch((error) => {
            console.error(error);
         });
   };

   const handleUpdateService = () => {
      for (var i = 0; i < hotelServices.length; i++) {
         axios
            .post(
               "/delete-service-by-hotelier/" + id,
               { serviceId: hotelServices[i].id },
               config
            )
            .then((response) => {
               console.log(response);
            })
            .catch((error) => {
               console.error(error);
            });
      }

      // const serviceRequest = hotel.services?.map((service) => service.value);
      // for (var j = 0; j < serviceRequest.length; j++) {
      //    axios
      //       .post(
      //          "/add-service/" + id,
      //          { serviceId: serviceRequest[j] },
      //          config
      //       )
      //       .then((response) => {
      //          console.log(response);
      //       })
      //       .catch((error) => {
      //          console.error(error);
      //       });
      // }
   };

   const handleRemoveImage = (imageId) => {
      let isConfirm = window.confirm(
         "Are you sure you want to delete this image?"
      );
      if (!isConfirm) return;
      axios
         .delete(`/delete-image/${id}?imageType=0`, config)
         .then((response) => {
            console.log(response);
            getHotelInfo();
            alert("Delete image successfully");
         })
         .catch((error) => {
            console.error(error);
         });
   };

   const handleAddImage = () => {
      const formData = new FormData();
               formData.append("image", newImage?.file);
               formData.append("imageType", 0);
               axios
               .post("/create-image/" + id, formData, configFormData)
               .then((response) => {
                  // console.log(response);
               })
               .catch((error) => {
                  console.error(error);
               });
   };

   return (
      <div className="hotel-edition">
         <Row>
            <Col xs={12} sm={12} md={12} lg={6} xl={7} xxl={7}>
               <div className="hotel-edition__form" ref={formRef}>
                  <h3>Edit Hotel</h3>
                  <div className="hotel-edition__form-row my-4 w-100 text-start">
                     <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                     >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                           type="text"
                           value={hotel?.name}
                           onChange={(e) => {
                              setHotel({ ...hotel, name: e.target.value });
                           }}
                        />
                     </Form.Group>
                  </div>
                  <div className="hotel-edition__form-row my-4 w-100 text-start">
                     <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                           type="text"
                           multiple
                           className="w-100"
                           rows={4}
                           value={hotel?.description}
                           onChange={(e) => {
                              setHotel({
                                 ...hotel,
                                 description: e.target.value,
                              });
                           }}
                        />
                     </Form.Group>
                  </div>
                  <div className="hotel-edition__form-row my-4 w-100 text-start">
                     <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                           type="text"
                           multiple
                           value={hotel?.address}
                           onChange={(e) => {
                              setHotel({ ...hotel, address: e.target.value });
                           }}
                        />
                     </Form.Group>
                  </div>
                  <div className="hotel-edition__form-row hotel-edition_location my-4 w-100 text-start">
                     <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                           type="text"
                           multiple
                           value={hotel?.location}
                           onChange={(e) => {
                              setLocation(e.target.value);
                              setHotel({ ...hotel, location: e.target.value });
                           }}
                        />
                     </Form.Group>
                     {location.includes("iframe") && (
                        <div
                           className="w-50 my-3"
                           dangerouslySetInnerHTML={{ __html: location }}
                        ></div>
                     )}
                  </div>
                  <div className="d-flex justify-content-between text-start w-100">
                     <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                           type="number"
                           value={hotel?.price}
                           step={0.01}
                           onChange={(e) => {
                              setHotel({ ...hotel, price: e.target.value });
                           }}
                        />
                     </Form.Group>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                     <Select
                        className="hotel-addition__selector w-50 me-3"
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        required
                        defaultValue={stars.find(
                           (star) => star.value === hotel?.star
                        )}
                        options={stars}
                        onChange={(e) => {
                           setHotel({ ...hotel, star: e.value });
                           // console.log(newHotel);
                        }}
                        placeholder="Select star..."
                     />
                  </div>
                  <div>
                     <Button
                        variant="contained"
                        color="secondary"
                        className="mt-3"
                        onClick={handleUpdateBasicInformation}
                     >
                        Update basic information
                     </Button>
                  </div>
                  <div className="hotel-edition__form-row my-4 w-100">
                     <Select
                        className="hotel-edition__selector"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={services}
                        onChange={(e) => {
                           setHotel({ ...hotel, services: e });
                        }}
                        placeholder="Select services..."
                     />
                  </div>
                  <Button
                     variant="contained"
                     color="secondary"
                     className="mt-2 mb-4"
                     onClick={handleUpdateService}
                  >
                     Update service
                  </Button>
                  <hr />
                  <div className="hotel-edition__form-row my-4 w-100">
                     {hotelImages?.map((image, index) => (
                        <div className="w-100" key={index}>
                           <Button
                              color="warning"
                              variant="contained"
                              className="me-4"
                              onClick={() => {
                                 handleRemoveImage(image.id);
                              }}
                           >
                              Remove
                           </Button>
                           <Image
                              src={`http://localhost:5000/` + image.image_path}
                              className="w-50"
                           />
                           <hr />
                        </div>
                     ))}
                  </div>
                  <div>
                     <Form.Group
                        className="mb-3 text-start"
                        controlId="exampleForm.ControlInput1"
                     >
                        <Form.Label>Add Image</Form.Label>
                        <Form.Control
                           type="file"
                           onChange={(e) => {
                              handleChangeImage(e);
                           }}
                           accept="image/png, image/gif, image/jpeg"
                        />
                     </Form.Group>
                     <Button
                        variant="contained"
                        color="secondary"
                        className="mt-2 mb-4"
                        onClick={handleAddImage}
                     >
                        Add image
                     </Button>
                  </div>

                  {/* <Button
                     variant="contained"
                     color="secondary"
                     className="mt-2 mb-4"
                     onClick={handleUpdateImage}
                  >
                     Update image
                  </Button> */}
               </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={5} xxl={5}>
               <Button
                  variant="outlined"
                  color="success"
                  className="d-flex align-items-center px-4"
                  onClick={() => {
                     navigate("/hotelier/add-room?hotelId=" + id);
                  }}
               >
                  <PlusCircle size="20px" /> &nbsp; Add New Room
               </Button>
               <div className="hotel-edition__room-list">
                  {hotelRooms?.map((room, index) => (
                     <div key={index} className="hotel-edition__room my-3">
                        <div className="hotel-edition__room-image">
                           <Image src={room?.images?.slice(0,1)} width="100%" />
                        </div>
                        <div
                           className="hotel-edition__room-info text-start"
                           onClick={() => {
                              navigate("/hotelier/edit-room/1");
                           }}
                        >
                           <h4 className="one-line-restrict">{room?.name}</h4>
                           <p className="two-line-restrict">
                              {room?.description}
                           </p>
                           <div className="d-flex justify-content-between pe-3">
                              <p>${room?.price}</p>
                              <p>Area : {room?.area}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </Col>
         </Row>
      </div>
   );
};

export default HotelEdition;
