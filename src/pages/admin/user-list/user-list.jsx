import "./user-list.scss";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const users = [
   {
      name: "John",
      phoneNumber: "0987897656",
      email: "john@example.com",
      role: 0,
   },
   {
      name: "John Lop",
      phoneNumber: "0987897656",
      email: "john@example.com",
      role: 1,
   },
   {
      name: "John",
      phoneNumber: "0987897656",
      email: "john@example.com",
      role: 0,
   },
   {
      name: "Frtyyyy",
      phoneNumber: "0987897656",
      email: "dwewewewew@example.com",
      role: 1,
   },
   {
      name: "John",
      phoneNumber: "0987897656",
      email: "john@example.com",
      role: 1,
   },
   {
      name: "John",
      phoneNumber: "0987897656",
      email: "john@example.com",
      role: 0,
   },
   {
      name: "John",
      phoneNumber: "0987897656",
      email: "john@example.com",
      role: 0,
   },
];

const UserList = () => {
   const navigate = useNavigate();
   const { userInformation } = useSelector((state) => state.userLogin);

   const config = {
      headers: {
         Authorization: `Bearer ${userInformation?.token}`,
         "Content-Type": "application/json",
      },
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
                  <th className="text-start" scope="col">
                     Email
                  </th>
                  <th className="text-start" scope="col">
                     Phone Number
                  </th>
                  <th className="text-start" scope="col">
                     Role
                  </th>
               </tr>
            </MDBTableHead>
            <MDBTableBody>
               {users.map((user, index) => (
                  <tr
                     className={
                        user.role === 0 ? "table-primary" : "table-success"
                     }
                  >
                     <th scope="row" className="text-start">
                        {index + 1}
                     </th>
                     <td className="text-start">{user.name}</td>
                     <td className="text-start">{user.email}</td>
                     <td className="text-start">{user.phoneNumber}</td>
                     <td className="text-start">
                        {user.role === 0 ? "Customer" : "Hotelier"}
                     </td>
                  </tr>
               ))}
            </MDBTableBody>
         </MDBTable>
      </div>
   );
};

export default UserList;
