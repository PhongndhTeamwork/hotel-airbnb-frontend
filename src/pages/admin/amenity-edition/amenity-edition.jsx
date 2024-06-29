import { useNavigate, useParams } from "react-router-dom";
import "./amenity-edition.scss";
import { Button } from "@mui/material/";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Form, Image } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

const AmenityEdition = () => {
   const { id } = useParams();
   const navigate = useNavigate();

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

   const getAmenity = useCallback(() => {
      if (!id) return;
      axios
         .get("/get-service-detail/" + id, config)
         .then(({ data }) => {
            console.log(data);
            setAmenity(data[0]);
            setAmenityImage((prevState) => ({
               ...prevState,
               url: "http://localhost:5000/" + data[0].image_path,
            }));
         })
         .catch((error) => {
            console.error(error);
         });
   }, [config, id]);

   useEffect(() => {
      getAmenity();
   }, [getAmenity]);

   const handleChangeImage = (e) => {
      const file = e.target.files[0];
      if (file) {
         const imageURL = URL.createObjectURL(file);
         setAmenityImage({ file: file, url: imageURL });
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      console.log(amenityImage.url);
      if (!amenityImage.url.includes(amenity?.image_path))
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
               alert("Update service successfully");
               getAmenity();
            })
            .catch((error) => {
               console.error(error);
            });
      }
   };

   return (
      <div className="amenity-edition">
         <Button variant="contained" color="info" className="mt-3" style={{width : "10rem"}} onClick={() => {
            navigate("/admin/amenity")
         }}>
            <ArrowLeft />
            &nbsp;&nbsp;&nbsp;Go back
         </Button>
         <form className="amenity-edition__form" onSubmit={handleSubmit}>
            <h4>{id ? "Edit Amenity" : "Add Amenity"}</h4>
            <hr className="my-4" />
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
                  required={id ? false : true}
                  // value={amenity?.name}
                  onChange={(e) => {
                     // setAmenity({ ...amenity, amenityImage: e.target.value });
                     handleChangeImage(e);
                  }}
               />
            </Form.Group>
            <div className="mt-3" style={{ width: "15%" }}>
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
      </div>
   );
};
export default AmenityEdition;
