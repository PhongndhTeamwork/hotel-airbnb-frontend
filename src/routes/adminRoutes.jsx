import { Route, Routes } from "react-router-dom";
import UserList from "../pages/admin/user-list/user-list";
import AmenitiesModification from "../pages/admin/amenities-modification/amenities-modification";
import AmenityEdition from "../pages/admin/amenity-edition/amenity-edition";

const AdminRoutes = () => {
   return (
      <div className="admin-routes">
         <Routes>
            <Route path="/user-list" element={<UserList />} />
            <Route path="/amenity" element={<AmenitiesModification />} />
            <Route path="/add-amenity" element={<AmenityEdition />} />
            <Route path="/edit-amenity/:id" element={<AmenityEdition />} />
         </Routes>
      </div>
   );
};
export default AdminRoutes;
