import { useEffect, useState } from "react";
import "./hotel-addition.scss";
import { Button, TextField } from "@mui/material/";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { PlusCircle, DashCircle } from "react-bootstrap-icons";
import { Image } from "react-bootstrap";
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

const HotelAddition = () => {
   const [location, setLocation] = useState("");

   const [newHotel, setNewHotel] = useState({});

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

   return (
      <div className="hotel-addition">
         <div className="hotel-addition__form">
            <h3>Add New Hotel</h3>
            <div className="hotel-addition__form-row my-4 w-100">
               <TextField
                  // id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  className="w-100"
                  size="small"
               />
            </div>
            <div className="hotel-addition__form-row my-4 w-100">
               <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  className="w-100"
                  rows={4}
                  size="small"
               />
            </div>
            <div className="hotel-addition__form-row my-4 w-100">
               <TextField
                  label="Address"
                  variant="outlined"
                  className="w-100"
                  size="small"
               />
            </div>
            <div className="hotel-addition__form-row hotel-addition_location my-4 w-100">
               <TextField
                  label="Location"
                  variant="outlined"
                  className="w-100"
                  size="small"
                  // multiline
                  // rows={4}
                  onChange={(e) => {
                     setLocation(e.target.value);
                  }}
               />
               {location.includes("iframe") && (
                  <div
                     className="w-50 my-3"
                     dangerouslySetInnerHTML={{ __html: location }}
                  ></div>
               )}
            </div>
            <div className="hotel-addition__form-row my-4 w-100">
               <Select
                  className="hotel-addition__selector"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  // defaultValue={}
                  isMulti
                  options={services}
                  placeholder="Select services..."
               />
            </div>
            <div className="hotel-addition__form-row my-4 w-100">
               <Select
                  className="hotel-addition__selector"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  // defaultValue={}
                  isMulti
                  options={services}
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
                     <div className="mt-4">
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
            <Button variant="contained" color="secondary" className="mt-4">Submit</Button>
         </div>
      </div>
   );
};

export default HotelAddition;
