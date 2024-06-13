import { Route, Routes } from "react-router-dom";
import Hotels from "../pages/hotelier/hotels/hotels";
import Rooms from "../pages/hotelier/rooms/rooms";
import Profile from "../pages/hotelier/profile/profile";
import HotelEdition from "../pages/hotelier/hotel-edition/hotel-edition";
import RoomEdition from "../pages/hotelier/room-edition/room-edition";
import HotelAddition from "../pages/hotelier/hotel-addition/hotel-addtion";


const HotelierRoutes = () => {
   return (
      <div className="hotelier-routes">
         <Routes>
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-hotel" element={<HotelAddition />} />
            <Route path="/edit-hotel/:id" element={<HotelEdition />} />
            <Route path="/add-room" element={<RoomEdition />} />
            <Route path="/edit-room/:id" element={<RoomEdition />} />
         </Routes>
      </div>
   );
};
export default HotelierRoutes;
