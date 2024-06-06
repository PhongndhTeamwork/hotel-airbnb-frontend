import { Route, Routes } from "react-router-dom";
import HotelDetail from "../pages/customer/hotel-detail/hotel-detail";
import RoomDetail from "../pages/customer/room-detail/room-detail";
import Home from "../pages/customer/home/home";

const CustomerRoutes = () => {
   return (
      <div className="user-routes">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotel/:id" element={<HotelDetail />} />
            <Route path="/room/:id" element={<RoomDetail />} />
         </Routes>
      </div>
   );
};
export default CustomerRoutes;
