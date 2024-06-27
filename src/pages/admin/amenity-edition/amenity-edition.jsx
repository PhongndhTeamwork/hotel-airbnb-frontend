import { useParams } from "react-router-dom";
import "./amenity-edition.scss";
import { Button, TextField } from "@mui/material/";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { InfoCircleFill } from "react-bootstrap-icons";
import axios from "axios";
import { Form, Image } from "react-bootstrap";

const AmenityEdition = () => {
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

   const configFormData = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${userInformation?.token}`,
            "Content-Type": "multipart/form-data",
         },
      };
   }, [userInformation]);

   const [amenity, setAmenity] = useState({});
   const [amenityImage, setAmenityImage] = useState({
      url: "",
      file: null,
   });

   useEffect(() => {
      if (!id) return;
      axios
         .get("/get-service-detail/" + id, config)
         .then(({ data }) => {
            console.log(data);
            setAmenity(data[0]);
         })
         .catch((error) => {
            console.error(error);
         });
   }, [config, id]);

   const handleChangeImage = (e) => {
      const file = e.target.files[0];
      if (file) {
         const imageURL = URL.createObjectURL(file);
         setAmenityImage({ file: file, url: imageURL });
      }
   };

   const handleSubmit = (e) => {
      // console.log(e)
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", amenityImage.file);
      formData.append("name", amenity.name);
      if (!id) {
         axios
            .post("/create-service", formData, configFormData)
            .then(({ data }) => {
               console.log(data);
               setAmenity({ name: "" });
               setAmenityImage({
                  url: "",
                  file: null,
               });
               alert("Create service successfully");
            })
            .catch((error) => {
               console.error(error);
            });
      } else {
         axios
            .put("/update-service/" + id, formData, configFormData)
            .then(({ data }) => {
               console.log(data);
               setAmenity({ name: "" });
               setAmenityImage({
                  url: "",
                  file: null,
               });
               alert("Create service successfully");
            })
            .catch((error) => {
               console.error(error);
            });
      }
   };

   return (
      <form className="amenity-edition" onSubmit={handleSubmit}>
         <h4>{id ? "Edit Amenity" : "Add Amenity"}</h4>
         <hr className="my-4" />
         {/* <TextField
            label="Name"
            variant="outlined"
            className="w-100"
            size="small"
            required
            value={amenity?.name}
            // multiline
            // rows={4}
            onChange={(e) => {
               setAmenity({ ...amenity, name: e.target.value });
            }}
         /> */}
         <Form.Group className="mb-3 text-start">
            <Form.Label className="text-start">Name</Form.Label>
            <Form.Control
               type="text"
               required
               value={amenity?.name}
               onChange={(e) => {
                  setAmenity({ ...amenity, name: e.target.value });
               }}
            />
         </Form.Group>
         <Form.Group className="mb-3 text-start">
            <Form.Label className="ms-0">Image</Form.Label>
            <Form.Control
               type="file"
               required
               // value={amenity?.name}
               onChange={(e) => {
                  // setAmenity({ ...amenity, amenityImage: e.target.value });
                  handleChangeImage(e);
               }}
            />
         </Form.Group>
         <div className="w-25 mt-3">
            <Image src={amenityImage?.url} width="100%" />
         </div>
         <Button
            type="submit"
            className="mt-5"
            variant="contained"
            color="success"
         >
            {id ? "Edit Amenity" : "Add Add Amenity"}
         </Button>
      </form>
   );
};
export default AmenityEdition;
