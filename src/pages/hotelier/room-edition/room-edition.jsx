import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./room-edition.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material/";
// import Select from "react-select";
// import makeAnimated from "react-select/animated";
import { PlusCircle, DashCircle, ArrowLeft } from "react-bootstrap-icons";
import { Form, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

// const animatedComponents = makeAnimated();

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
   const hotelId = searchParams.get("hotelId");
   const navigate = useNavigate();
   const [images, setImages] = useState([]);
   const [newImage, setNewImage] = useState();
   const [room, setRoom] = useState();

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

   const getRoom = useCallback(() => {
      if (!id) return;
      axios
         .get(`/get-room-detail/${id}`)
         .then(({ data }) => {
            console.log(data);
            setRoom(data[0]);
         })
         .catch((error) => {
            console.error(error);
         });
   }, [id]);

   const getImages = useCallback(() => {
      axios
         .get(`/get-image/${id}?imageType=1`, config)
         .then(({ data }) => {
            // console.log(data);
            setImages(data);
         })
         .catch((error) => {
            console.error(error);
         });
   }, [config, id]);

   useEffect(() => {
      getRoom();
   }, [getRoom]);

   useEffect(() => {
      getImages();
   }, [getImages]);

   const handleRemoveImage = (imageId) => {
      let isConfirm = window.confirm(
         "Are you sure you want to delete this image?"
      );
      if (!isConfirm) return;
      axios
         .delete(`/delete-each-image/${id}/${imageId}?imageType=1`, config)
         .then(() => {
            getImages();
            alert("Delete image successfully");
         })
         .catch((error) => {
            console.error(error);
         });
   };

   const handleChangeImage = (e) => {
      const file = e.target.files[0];
      if (file) {
         const imageURL = URL.createObjectURL(file);
         setNewImage({
            path: imageURL,
            file: file,
         });
      }
   };

   const handleUpdateBasicInformation = (e) => {
      e.preventDefault();
      console.log(room);
      const roomRequest = {
         type: room.type,
         price: room.price,
         area: room.area,
      };
      axios
         .put(`/update-room/${hotelId}/${id}`, roomRequest, config)
         .then(() => {
            alert("Room updated successfully!");
            getRoom();
         })
         .catch((err) => {
            console.error(err);
         });
   };

   const handleAddImage = () => {
      const formData = new FormData();
      formData.append("image", newImage?.file);
      formData.append("imageType", 1);
      axios
         .post("/create-image/" + id, formData, configFormData)
         .then(() => {
            setNewImage({
               path: "",
               file: "",
            });
            getImages();
            alert("Image created successfully");
         })
         .catch((error) => {
            console.error(error);
         });
   };

   return (
      <Form className="room-edition" onSubmit={handleUpdateBasicInformation}>
         <Button
            variant="contained"
            color="warning"
            className="my-3"
            style={{ width: "10rem" }}
            onClick={() => {
               navigate(-1);
            }}
         >
            <ArrowLeft />
            &nbsp;&nbsp;&nbsp;Go back
         </Button>
         <div className="room-edition__form">
            <h3>Update room</h3>
            <div className="room-edition__form-row my-4 w-100">
               <Form.Group
                  className="mb-3 text-start"
                  controlId="exampleForm.ControlInput1"
               >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                     type="text"
                     required
                     value={room?.name}
                     onChange={(e) => {
                        setRoom({ ...room, name: e.target.value });
                     }}
                  />
               </Form.Group>
            </div>
            <div className="room-edition__form-row my-4 w-100 d-flex flex-row">
               <Form.Group className="mb-3 w-100 text-start me-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                     type="text"
                     required
                     value={room?.price}
                     onChange={(e) => {
                        setRoom({ ...room, price: e.target.value });
                     }}
                     step={0.01}
                  />
               </Form.Group>
               <Form.Group className="mb-3 w-100 text-start mx-3">
                  <Form.Label>Area</Form.Label>
                  <Form.Control
                     type="text"
                     required
                     value={room?.area}
                     onChange={(e) => {
                        setRoom({ ...room, area: e.target.value });
                     }}
                     step={0.01}
                  />
               </Form.Group>

               <Form.Group className="mb-3 w-100 text-start ms-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                     required
                     value={room?.type}
                     onChange={(e) => {
                        setRoom((prevStatus) => {
                           return { ...prevStatus, type: e.target.value };
                        });
                     }}
                  >
                     {types.map((type, index) => (
                        <option key={index} value={type.value}>
                           {type.label}
                        </option>
                     ))}
                  </Form.Select>
               </Form.Group>
            </div>
            <div className="d-flex justify-content-start">
               <Button
                  variant="contained"
                  color="secondary"
                  className="mt-1"
                  type="submit"
               >
                  Update basic information
               </Button>
            </div>
            <hr className="my-5" />

            <div className="room-edition__form-row my-4 w-100">
               {images?.map((image, index) => (
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
               <div className="d-flex justify-content-start">
                  <Image src={newImage?.path} className="w-50" />
               </div>
               <div className="d-flex justify-content-start">
                  <Button
                     variant="contained"
                     color="secondary"
                     className="mt-2 mb-4"
                     onClick={handleAddImage}
                  >
                     Add image
                  </Button>
               </div>
            </div>
         </div>
      </Form>
   );
};

export default RoomEdition;
