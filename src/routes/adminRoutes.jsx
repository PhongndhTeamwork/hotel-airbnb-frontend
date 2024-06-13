import { Route, Routes } from "react-router-dom";
import UserList from "../pages/admin/user-list/user-list";
import AmenitiesModification from "../pages/admin/amenities-modification/amenities-modification";

const AdminRoutes = () => {
   return (
      <div className="admin-routes">
         <Routes>
            <Route path="/user-list" element={<UserList />} />
            <Route path="/amenity" element={<AmenitiesModification />} />
         </Routes>
      </div>
   );
};
export default AdminRoutes;
