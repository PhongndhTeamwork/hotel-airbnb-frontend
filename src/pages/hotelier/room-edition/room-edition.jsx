import { useParams, useSearchParams } from "react-router-dom";
import "./room-edition.scss";
import { useEffect, useMemo, useState } from "react";
import { Button, TextField } from "@mui/material/";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { PlusCircle, DashCircle } from "react-bootstrap-icons";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
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

const types = [
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
];

const RoomEdition = () => {
   const { id } = useParams();
   const { userInformation } = useSelector((state) => state.userLogin);
   const [searchParams] = useSearchParams();
  const hotelId = searchParams.get('hotelId');

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

   useEffect(() => {
      if (!id) return;
      axios
         .get(`/get-room-detail/${id}`)
         .then(({ data }) => {
            console.log(data);
         })
         .catch((error) => {
            console.error(error);
         });
   });

   const [numberOfImage, setNumberOfImage] = useState(3);
   const [images, setImages] = useState([]);
   const [room, setRoom] = useState({});

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

   const handleSubmit = (e) => {
      e.preventDefault();
      axios
      .post("/create-room/"+hotelId, room, config)
      .then(({ data }) => {
         for (var i = 0; i < images.length; i++) {
            const formData = new FormData();
            formData.append("image", images[i].file);
            formData.append("imageType", 1);

            // console.log(images[i].file);
            console.log(data);
            axios
               .post("/create-image/" + data[0].id, formData, configFormData)
               .then((response) => {
                  // console.log(response);
               })
               .catch((error) => {
                  console.error(error);
               });
         }
      })
      .then(() => {
         console.log("Room added successfully");
         setRoom({
            name: "",
            address: "",
            star: 1,
            description: "",
            price: 0,
         });
         setImages([]);
         alert("Room added successfully");
      })
      .catch((error) => {
         console.error(error);
      });
   };

   return (
      <form className="room-edition" onSubmit={handleSubmit}>
         <div className="room-edition__form">
            <h3>{id ? "Edit room" : "Add New Room"}</h3>
            <div className="room-edition__form-row my-4 w-100">
               <TextField
                  // id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  required
                  className="w-100"
                  size="small"
                  value={room?.name}
                  onChange={(e) => {
                     setRoom({ ...room, name: e.target.value });
                  }}
               />
            </div>
            <div className="room-edition__form-row my-4 w-100 d-flex flex-row">
               <TextField
                  label="Price"
                  variant="outlined"
                  className="w-100 me-2"
                  type="number"
                  size="small"
                  InputProps={{
                     inputProps: {
                        step: 0.05,
                     },
                  }}
                  value={room?.price}
                  onChange={(e) => {
                     setRoom({ ...room, price: e.target.value });
                  }}
               />
               <TextField
                  label="Area"
                  variant="outlined"
                  className="w-100 ms-2"
                  type="number"
                  size="small"
                  value={room?.area}
                  onChange={(e) => {
                     setRoom({ ...room, area: e.target.value });
                  }}
               />
            </div>
            {/* <div className="room-edition__form-row my-4 w-100">
               <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  className="w-100"
                  rows={4}
                  size="small"
               />
            </div> */}
            <div className="room-edition__form-row my-4 w-100">
               <Select
                  className="room-edition__selector"
                  classNamePrefix="select"
                  name="type"
                  options={types}
                  placeholder="Select type..."
                  onChange={(e) => {
                     setRoom({ ...room, star: e.value });
                     // console.log(newHotel);
                  }}
               />
            </div>
            <div className="room-edition__form-row my-4 w-100">
               <div className="d-flex room-edition__image-button">
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
                           className="room-edition__image-input d-flex justify-content-start"
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
                           <div className="room-edition__image w-50 mt-3">
                              <Image src={images[index]?.image} width="100%" />
                           </div>
                        )}
                     </div>
                  ))}
            </div>
            <Button
               variant="contained"
               color="secondary"
               className="mt-4"
               type="submit"
            >
               Submit
            </Button>
         </div>
      </form>
   );
};

export default RoomEdition;
