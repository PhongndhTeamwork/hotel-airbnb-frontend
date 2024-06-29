import { useSelector } from "react-redux";
import "./booked-room.scss";
import { useMemo } from "react";

const BookedRoom = () => {
   const { userInformation } = useSelector((state) => state.userLogin);

   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${userInformation?.token}`,
            "Content-Type": "application/json",
         },
      };
   }, [userInformation]);
   return <div></div>;
};

export default BookedRoom;
