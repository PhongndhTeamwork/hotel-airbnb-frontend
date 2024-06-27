import { useSelector } from "react-redux";
import "./booked.scss";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Booked = () => {
   const { userInformation } = useSelector((state) => state.userLogin);

   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${userInformation?.token}`,
            "Content-Type": "application/json",
         },
      };
   }, [userInformation]);

   const [booked, setBooked] = useState([]);

   useEffect(() => {
      axios
         .get("/get-booking?pageNumber=1&pageSize=1000", config)
         .then(({ data }) => {
            console.log(data);
            setBooked(data.data);
         })
         .then((error) => {
            console.error(error);
         });
   }, [config]);

   return (
      <div className="booked">
         <h4>Booked</h4>
         <div className="booked__item">
            {booked.map((book, index) => (
               <div key={index}>
                  {book.leaving_date}
               </div>
            ))}
         </div>
      </div>
   );
};

export default Booked;
