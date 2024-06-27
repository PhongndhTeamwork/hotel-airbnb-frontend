import { useEffect, useMemo, useState } from "react";
import "./hotel-addition.scss";
import { Button, TextField } from "@mui/material/";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { PlusCircle, DashCircle } from "react-bootstrap-icons";
import { Image } from "react-bootstrap";
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

const HotelAddition = () => {
   const [location, setLocation] = useState("");

   const [services, setServices] = useState([]);

   const [newHotel, setNewHotel] = useState({
      name: "",
      address: "",
      star: 1,
      description: "",
      location: "",
      services: [],
      price: 0,
   });

   const { error, loading, userInformation } = useSelector(
      (state) => state.userLogin
   );
   // const [isHouseAdded, setIsHouseAdded] = useState(false);

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

   // const [newHotelImages, setNewHotelImages] = useState([]);

   // useEffect(() => {
   //    axios
   //       .get("/get-hotel-as-customer")
   //       .then(({ data }) => {})
   //       .then((error) => {
   //          console.error(error);
   //       });
   // }, []);

   const [numberOfImage, setNumberOfImage] = useState(3);
   const [images, setImages] = useState([]);

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

   const handleHotelAddition = (e) => {
      e.preventDefault();
      if (!userInformation) return;
      // console.log(images, newHotel);
      // console.log(newHotel.services);
      const serviceRequest = newHotel.services?.map((service) => service.value);
      delete newHotel.location;
      delete newHotel.services;

      // console.log(serviceRequest)

      axios
         .post("/create-hotel", newHotel, config)
         .then(({ data }) => {
            for (var i = 0; i < images.length; i++) {
               const formData = new FormData();
               formData.append("image", images[i].file);
               formData.append("imageType", 0);
               // console.log(images[i].file);
               axios
                  .post("/create-image/" + data.id, formData, configFormData)
                  .then((response) => {
                     // console.log(response);
                  })
                  .catch((error) => {
                     console.error(error);
                  });
            }
            for (var j = 0; j < serviceRequest.length; j++) {
               axios
                  .post(
                     "/add-service/" + data.id,
                     { serviceId: serviceRequest[j] },
                     configFormData
                  )
                  .then((response) => {
                     // console.log(response);
                  })
                  .catch((error) => {
                     console.error(error);
                  });
            }
         })
         .then(() => {
            console.log("Hotel added successfully");
            setNewHotel({
               name: "",
               address: "",
               star: 1,
               description: "",
               location: "",
               services: [],
               price: 0,
            });
            setImages([]);
            alert("Hotel added successfully");
         })
         .catch((error) => {
            console.error(error);
         });
   };

   return (
      <div className="hotel-addition">
         <form className="hotel-addition__form" onSubmit={handleHotelAddition}>
            <h3>Add New Hotel</h3>
            <div className="hotel-addition__form-row my-4 w-100">
               <TextField
                  // id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  className="w-100"
                  required
                  size="small"
                  value={newHotel?.name}
                  onChange={(e) => {
                     setNewHotel({ ...newHotel, name: e.target.value });
                  }}
               />
            </div>
            <div className="hotel-addition__form-row my-4 w-100">
               <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  required
                  className="w-100"
                  rows={4}
                  size="small"
                  value={newHotel?.description}
                  onChange={(e) => {
                     setNewHotel({ ...newHotel, description: e.target.value });
                  }}
               />
            </div>
            <div className="hotel-addition__form-row my-4 w-100">
               <TextField
                  label="Address"
                  required
                  variant="outlined"
                  className="w-100"
                  value={newHotel?.address}
                  size="small"
                  onChange={(e) => {
                     setNewHotel({ ...newHotel, address: e.target.value });
                  }}
               />
            </div>
            <div className="hotel-addition__form-row hotel-addition_location my-4 w-100">
               <TextField
                  label="Location"
                  variant="outlined"
                  // required
                  className="w-100"
                  size="small"
                  // multiline
                  // rows={4}
                  value={newHotel?.location}
                  onChange={(e) => {
                     setLocation(e.target.value);
                     setNewHotel({ ...newHotel, location: e.target.value });
                  }}
               />
               {location.includes("iframe") && (
                  <div
                     className="w-50 my-3"
                     dangerouslySetInnerHTML={{ __html: location }}
                  ></div>
               )}
            </div>

            <div className="d-flex justify-content-between">
               <Select
                  className="hotel-addition__selector w-50 me-3"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  required
                  defaultValue={stars[0]}
                  options={stars}
                  onChange={(e) => {
                     setNewHotel({ ...newHotel, star: e.value });
                     // console.log(newHotel);
                  }}
                  placeholder="Select star..."
               />
               <TextField
                  label="Price"
                  variant="outlined"
                  className="w-100"
                  size="small"
                  required
                  // multiline
                  type="number"
                  value={newHotel?.price}
                  step={0.01}
                  onChange={(e) => {
                     setNewHotel({ ...newHotel, price: e.target.value });
                  }}
               />
            </div>
            <div className="hotel-addition__form-row my-4 w-100">
               <Select
                  className="hotel-addition__selector"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  required
                  // defaultValue={}
                  isMulti
                  options={services}
                  value={newHotel.services}
                  onChange={(e) => {
                     setNewHotel({ ...newHotel, services: e });
                     // console.log(newHotel);
                  }}
                  placeholder="Select services..."
               />
            </div>
            <div className="hotel-addition__form-row my-4 w-100">
               <div className="d-flex hotel-addition__image-button">
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
                     <div className="mt-4" key={index}>
                        <div
                           className="hotel-addition__image-input d-flex justify-content-start"
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
                           <div className="hotel-addition__image w-50 mt-3">
                              <Image src={images[index]?.image} width="100%" />
                           </div>
                        )}
                     </div>
                  ))}
            </div>
            <Button
               variant="contained"
               color="secondary"
               className="mt-4 px-5"
               type="submit"
            >
               Add
            </Button>
         </form>
      </div>
   );
};

export default HotelAddition;
