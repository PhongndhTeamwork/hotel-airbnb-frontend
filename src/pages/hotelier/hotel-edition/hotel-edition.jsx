import { useEffect, useRef, useState } from "react";
import "./hotel-edition.scss";
import { Button, TextField } from "@mui/material/";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { PlusCircle, DashCircle } from "react-bootstrap-icons";
import { Col, Image, Row } from "react-bootstrap";
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

const animatedComponents = makeAnimated();

const services = [
   {
      value: "City skyline view",
      label: "City skyline view",
   },
   {
      value: "Courtyard view",
      label: "Courtyard view",
   },
   {
      value: "Mountain view",
      label: "Mountain view",
   },
   {
      value: "Cleaning products",
      label: "Cleaning products",
   },
   {
      value: "Shampoo",
      label: "Shampoo",
   },
   {
      value: "Free dryer",
      label: "Free dryer",
   },
   {
      value: "Hangers",
      label: "Hangers",
   },
   {
      value: "Bed linens",
      label: "Bed linens",
   },
   {
      value: "Ethernet connection",
      label: "Ethernet connection",
   },
   {
      value: "Exercise equipment",
      label: "Exercise equipment",
   },
   {
      value: "Books and reading material",
      label: "Books and reading material",
   },
   {
      value: "Clothing storage",
      label: "Clothing storage",
   },
   {
      value: "Ceiling fan",
      label: "Ceiling fan",
   },
   {
      value: "Portable fans",
      label: "Portable fans",
   },
   {
      value: "Exterior security cameras",
      label: "Exterior security cameras",
   },
   {
      value: "Fire extinguisher",
      label: "Fire extinguisher",
   },
   {
      value: "First aid kit",
      label: "First aid kit",
   },
   {
      value: "Wifi",
      label: "Wifi",
   },
   {
      value: "Dedicated workspace",
      label: "Dedicated workspace",
   },
   {
      value: "Kitchen",
      label: "Kitchen",
   },
   {
      value: "Refrigerator",
      label: "Refrigerator",
   },
   {
      value: "Microwave",
      label: "Microwave",
   },
   {
      value: "Stove",
      label: "Stove",
   },
   {
      value: "Dedicated workspace",
      label: "Dedicated workspace",
   },
   {
      value: "Toaster",
      label: "Toaster",
   },
   {
      value: "Free parking on premises",
      label: "Free parking on premises",
   },
   {
      value: "Barbecue utensils",
      label: "Barbecue utensils",
   },
   {
      value: "Shared pool",
      label: "Shared pool",
   },
   {
      value: "EV charger",
      label: "EV charger",
   },
   {
      value: "Pets allowed",
      label: "Pets allowed",
   },
   {
      value: "Breakfast Buffet",
      label: "Breakfast Buffet",
   },
   {
      value: "Smoking allowed",
      label: "Smoking allowed",
   },
   {
      value: "Cleaning available during stay",
      label: "Cleaning available during stay",
   },
   {
      value: "Iron",
      label: "Iron",
   },
   {
      value: "Hot water kettle",
      label: "Hot water kettle",
   },
];

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

const HotelEdition = () => {
   const [location, setLocation] = useState("");
   const { id } = useParams();
   const navigate = useNavigate();
   const formRef = useRef();

   const [numberOfImage, setNumberOfImage] = useState(3);
   const [images, setImages] = useState([]);

   const [hotel, setHotel] = useState({});

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
      let imagesTemp = [...images];
      if (!imagesTemp[index]) {
         imagesTemp[index] = {};
      }
      if (file) {
         const imageURL = URL.createObjectURL(file);
         if (!imagesTemp[index].image) {
            imagesTemp[index].image = "";
         }
         imagesTemp[index].image = imageURL;
      }
      imagesTemp[index].file = file;
      setImages(imagesTemp);
   };

   useEffect(() => {}, []);

   const handleUpdateHotel = () => {
      console.log(images);
      console.log(hotel);
   };

   return (
      <div className="hotel-edition">
         <Row>
            <Col xs={12} sm={12} md={12} lg={6} xl={7} xxl={7}>
               <div className="hotel-edition__form" ref={formRef}>
                  <h3>Edit Hotel</h3>
                  <div className="hotel-edition__form-row my-4 w-100">
                     <TextField
                        // id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        className="w-100"
                        size="small"
                        value={hotel?.name}
                        onChange={(e) => {
                           setHotel({ ...hotel, name: e.target.value });
                        }}
                     />
                  </div>
                  <div className="hotel-edition__form-row my-4 w-100">
                     <TextField
                        label="Description"
                        variant="outlined"
                        multiline
                        className="w-100"
                        rows={4}
                        size="small"
                        value={hotel?.description}
                        onChange={(e) => {
                           setHotel({ ...hotel, description: e.target.value });
                        }}
                     />
                  </div>
                  <div className="hotel-edition__form-row my-4 w-100">
                     <TextField
                        label="Address"
                        variant="outlined"
                        className="w-100"
                        size="small"
                        value={hotel?.address}
                        onChange={(e) => {
                           setHotel({ ...hotel, address: e.target.value });
                        }}
                     />
                  </div>
                  <div className="hotel-edition__form-row hotel-edition_location my-4 w-100">
                     <TextField
                        label="Location"
                        variant="outlined"
                        className="w-100"
                        size="small"
                        // multiline
                        // rows={4}
                        value={hotel?.location}
                        onChange={(e) => {
                           setLocation(e.target.value);
                           setHotel({ ...hotel, location: e.target.value });
                        }}
                     />
                     {location.includes("iframe") && (
                        <div
                           className="w-50 my-3"
                           dangerouslySetInnerHTML={{ __html: location }}
                        ></div>
                     )}
                  </div>
                  <div className="hotel-edition__form-row my-4 w-100">
                     <Select
                        className="hotel-edition__selector"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        // defaultValue={hotel?.services}
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
                     onClick={handleUpdateHotel}
                  >
                     Submit
                  </Button>
                  <hr />
                  <div className="hotel-edition__form-row my-4 w-100">
                     <div className="d-flex hotel-edition__image-button">
                        <Button
                           variant="outlined"
                           color="success"
                           className="d-flex align-items-center justify-content-start"
                           onClick={() => {
                              setNumberOfImage((prev) => prev + 1);
                           }}
                        >
                           <div className="d-flex align-items-center justify-content-start">
                              <PlusCircle></PlusCircle> &nbsp;
                              <p className="mb-0 ms-2">Add Image</p>
                           </div>
                        </Button>
                        <Button
                           variant="outlined"
                           color="warning"
                           className="ms-3 d-flex align-items-center justify-content-start"
                           onClick={() => {
                              if (images[numberOfImage - 1]) {
                                 images.splice(numberOfImage - 1, 1);
                              }
                              setNumberOfImage((prev) =>
                                 prev > 3 ? prev - 1 : prev
                              );
                           }}
                        >
                           <DashCircle></DashCircle>
                           <p className="mb-0 ms-2">Remove Last Image</p>
                        </Button>
                     </div>
                     {Array(numberOfImage)
                        .fill(0)
                        .map((_, index) => (
                           <div className="mt-4">
                              <div
                                 className="hotel-edition__image-input d-flex justify-content-start"
                                 key={index}
                              >
                                 <Button variant="contained" component="label">
                                    Upload Image
                                    <input
                                       type="file"
                                       hidden
                                       onChange={(e) => {
                                          handleChangeImage(e, index);
                                       }}
                                       accept="image/png, image/gif, image/jpeg"
                                    />
                                 </Button>
                                 <TextField
                                    variant="outlined"
                                    value={images[index]?.image}
                                    // label="Selected File"
                                    size="small"
                                    InputProps={{
                                       readOnly: true,
                                    }}
                                    className="ms-3 w-75"
                                 />
                              </div>
                              {images[index]?.image && (
                                 <div className="hotel-edition__image w-50 mt-3">
                                    <Image
                                       src={images[index]?.image}
                                       width="100%"
                                    />
                                 </div>
                              )}
                           </div>
                        ))}
                  </div>
               </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={5} xxl={5}>
               <Button
                  variant="outlined"
                  color="success"
                  className="d-flex align-items-center px-4"
                  onClick={() => {
                     navigate("/hotelier/add-room");
                  }}
               >
                  <PlusCircle size="20px" /> &nbsp; Add New Room
               </Button>
               <div className="hotel-edition__room-list">
                  {rooms.map((room, index) => (
                     <div key={index} className="hotel-edition__room my-3">
                        <div className="hotel-edition__room-image">
                           <Image src={room.images[0]} width="100%" />
                        </div>
                        <div
                           className="hotel-edition__room-info text-start"
                           onClick={() => {
                              navigate("/hotelier/edit-room/1");
                           }}
                        >
                           <h4 className="one-line-restrict">{room.name}</h4>
                           <p className="two-line-restrict">
                              {room.description}
                           </p>
                           <div className="d-flex justify-content-between pe-3">
                              <p>${room.price}</p>
                              <p>{room.rating}/5.0</p>
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
