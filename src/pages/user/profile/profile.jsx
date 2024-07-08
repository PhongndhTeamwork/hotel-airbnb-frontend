import "./profile.scss";
import AvatarImage from "../../../assets/avatar/user.png";
import MaleAvatarImage from "../../../assets/avatar/man.png";
import FemaleAvatarImage from "../../../assets/avatar/teacher.png";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
   const [isEditMode, setIsEditMode] = useState(false);
   const [profile, setProfile] = useState();

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
      axios
         .get("/get-profile", config)
         .then(({ data }) => {
            setProfile(data[0]);
         })
         .catch((error) => {
            console.error(error);
         });
   }, [config]);

   const formatDateToDDMMYYYY = (date) => {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const year = d.getFullYear();

      return `${day}-${month}-${year}`;
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      axios
         .put("/update-profile", profile, config)
         .then(({ data }) => {
            console.log(data);
            alert("Update profile successfully");
            setIsEditMode(false);
         })
         .catch((error) => {
            console.error(error);
         });
   };

   return (
      <div className="profile">
         <Row>
            <Col
               xs={12}
               sm={12}
               md={5}
               lg={5}
               xl={5}
               xxl={5}
               className="profile__general"
            >
               <div className="profile__background-black"></div>
               <Image
                  src={AvatarImage}
                  width="50%"
                  className="profile__general-image"
               />
               <div className="profile__background-white"></div>
            </Col>
            <Col
               xs={12}
               sm={12}
               md={7}
               lg={7}
               xl={7}
               xxl={7}
               className="profile__detail"
            >
               <div>
                  <BootstrapSwitchButton
                     checked={isEditMode}
                     onlabel="Edit mode"
                     offlabel="Read mode"
                     onChange={(checked) => {
                        setIsEditMode(checked);
                     }}
                     width="160"
                     onstyle="success"
                  />
                  <div className="profile__detail-form">
                     <Form onSubmit={handleSubmit}>
                        <InputGroup className="mb-3">
                           <InputGroup.Text style={{ width: "150px" }}>
                              Name
                           </InputGroup.Text>
                           <Form.Control
                              placeholder="Username"
                              disabled={!isEditMode}
                              value={profile?.name}
                              onChange={(e) => {
                                 setProfile((prev) => {
                                    return { ...prev, name: e.target.value };
                                 });
                              }}
                           />
                        </InputGroup>
                        <InputGroup className="mb-3">
                           <InputGroup.Text style={{ width: "150px" }}>
                              Email
                           </InputGroup.Text>
                           <Form.Control
                              placeholder="Email"
                              as="input"
                              type="email"
                              disabled={!isEditMode}
                              value={profile?.email}
                              onChange={(e) => {
                                 setProfile((prev) => {
                                    return { ...prev, email: e.target.value };
                                 });
                              }}
                           />
                        </InputGroup>
                        <InputGroup className="mb-3">
                           <InputGroup.Text style={{ width: "150px" }}>
                              Gender
                           </InputGroup.Text>
                           <Form.Select
                              disabled={!isEditMode}
                              value={profile?.gender}
                              onChange={(e) => {
                                 setProfile((prev) => {
                                    return { ...prev, gender: e.target.value };
                                 });
                              }}
                           >
                              <option value={-1}>Gender</option>
                              <option value={0}>Male</option>
                              <option value={1}>Female</option>
                           </Form.Select>
                        </InputGroup>
                        <InputGroup className="mb-3">
                           <InputGroup.Text style={{ width: "150px" }}>
                              Phone Number
                           </InputGroup.Text>
                           <Form.Control
                              as="input"
                              placeholder="Phone number"
                              type="tel"
                              disabled={!isEditMode}
                              value={profile?.phone_number}
                              onChange={(e) => {
                                 setProfile((prev) => {
                                    return {
                                       ...prev,
                                       phone_number: e.target.value,
                                    };
                                 });
                              }}
                           />
                        </InputGroup>
                        <InputGroup className="mb-3">
                           <InputGroup.Text style={{ width: "150px" }}>
                              Date of Birth
                           </InputGroup.Text>
                           <Form.Control
                              as="input"
                              placeholder="Date of Birth"
                              type="date"
                              value={new Date(profile?.dob)}
                              disabled={!isEditMode}
                              onChange={(e) => {
                                 setProfile((prev) => {
                                    return { ...prev, dob: e.target.value };
                                 });
                              }}
                           />
                        </InputGroup>
                        <InputGroup className="mb-3">
                           <InputGroup.Text style={{ width: "150px" }}>
                              Register Date
                           </InputGroup.Text>
                           <Form.Control
                              value={formatDateToDDMMYYYY(
                                 new Date(profile?.register_datetime)
                              )}
                              disabled={true}
                           />
                        </InputGroup>
                        {isEditMode && (
                           <Button
                              variant="primary"
                              className="px-5 mt-3"
                              type="submit"
                           >
                              Update
                           </Button>
                        )}
                     </Form>
                  </div>
               </div>
            </Col>
         </Row>
      </div>
   );
};

export default Profile;
