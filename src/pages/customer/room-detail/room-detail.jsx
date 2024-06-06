import { useParams } from "react-router-dom";
import "./room-detail.scss";

const RoomDetail = () => {
   const { id } = useParams();

   return <div className="room-detail">
      <div className="room-detail__nav">
         
      </div>
   </div>;
};

export default RoomDetail;
