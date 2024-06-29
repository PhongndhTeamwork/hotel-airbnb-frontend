import { useEffect, useMemo, useState } from "react";
import "./user-list.scss";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const UserList = () => {
   const navigate = useNavigate();
   const { userInformation } = useSelector((state) => state.userLogin);

   const [allUsers, setAllUsers] = useState();

   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${userInformation?.token}`,
            "Content-Type": "application/json",
         },
      };
   }, [userInformation?.token]);

   useEffect(() => {
      axios
         .get("/get-user?pageNumber=1&pageSize=1000", config)
         .then(({ data }) => {
            setAllUsers(data.data);
         })
         .catch((err) => {
            console.error(err);
         });
   }, [config]);

   const formatDateToDDMMYYYY = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
   };

   return (
      <div className="user-list">
         <Button
            className="my-3"
            onClick={() => {
               navigate("/admin/amenity");
            }}
         >
            Go to Amenities
         </Button>
         <MDBTable>
            <MDBTableHead>
               <tr className="table-danger">
                  <th className="text-start" scope="col">
                     #
                  </th>
                  <th className="text-start" scope="col">
                     Name
                  </th>
                  {/* <th className="text-start" scope="col">
                     Email
                  </th> */}
                  <th className="text-start" scope="col">
                     Phone Number
                  </th>
                  <th className="text-start" scope="col">
                     Role
                  </th>
                  <th className="text-start" scope="col">
                     Register Date
                  </th>
               </tr>
            </MDBTableHead>
            <MDBTableBody>
               {allUsers?.map((user, index) => (
                  <tr
                     className={
                        user.role === 0 ? "table-primary" : "table-success"
                     }
                     key={index}
                  >
                     <th scope="row" className="text-start">
                        {index + 1}
                     </th>
                     <td className="text-start">{user.name}</td>
                     {/* <td className="text-start">{user.email}</td> */}
                     <td className="text-start">{user.phone_number}</td>
                     <td className="text-start">
                        {user.role === 0 ? "Customer" : "Hotelier"}
                     </td>
                     <td className="text-start">
                        {formatDateToDDMMYYYY(new Date(user.register_datetime))}
                     </td>
                  </tr>
               ))}
            </MDBTableBody>
         </MDBTable>
      </div>
   );
};

export default UserList;
