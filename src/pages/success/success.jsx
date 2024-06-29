import axios from "axios";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Success = () => {
   const [searchParams] = useSearchParams();
   const id  = searchParams.get('id')
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
   useEffect(() => {
      console.log(id)
      axios
         .put("/update-booking-status/" + id, {}, config)
         .then((data) => {
            console.log(data);
            navigate("/booked");
         })
         .catch((err) => {
            console.error(err);
         });
   }, [config, id, navigate]);
   return <div></div>;
};

export default Success;
