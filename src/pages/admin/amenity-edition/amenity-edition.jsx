import { useParams } from "react-router-dom";
import "./amenity-edition.scss";
import { Button, TextField } from "@mui/material/";
import { useEffect, useState } from "react";

const AmenityEdition = () => {
   const { id } = useParams();

   const [amenity, setAmenity] = useState({});
   const [amenityImage, setAmenityImage] = useState({
      url: "",
      file: null,
   });

   useEffect(() => {}, []);

   const handleChangeImage = (e) => {
      const file = e.target.files[0];
      if (file) {
         const imageURL = URL.createObjectURL(file);
         setAmenityImage({ file: file, url: imageURL });
      }
   };

   return (
      <div className="amenity-edition">
         <h4>{id ? "Edit Amenity" : "Add Amenity"}</h4>
         <hr className="my-4" />
         <TextField
            label="Location"
            variant="outlined"
            className="w-100"
            size="small"
            value={amenity?.name}
            // multiline
            // rows={4}
            onChange={(e) => {
               setAmenity({ ...amenity, name: e.target.value });
            }}
         />
         <div className="d-flex justify-content-start mt-3">
            <Button variant="contained" component="label" style={{width:"30%"}}>
               Upload Image
               <input
                  type="file"
                  hidden
                  onChange={(e) => {
                     handleChangeImage(e);
                  }}
                  accept="image/png, image/gif, image/jpeg"
               />
            </Button>
            <TextField
               variant="outlined"
               // value={images[index]?.image}
               // label="Selected File"
               size="small"
               InputProps={{
                  readOnly: true,
               }}
               className="ms-3 w-100"
            />
         </div>
      </div>
   );
};
export default AmenityEdition;
