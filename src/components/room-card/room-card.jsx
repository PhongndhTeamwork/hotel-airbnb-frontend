import "./room-card.scss";

import { Image, Row, Col } from "react-bootstrap";
import AreaIcon from "../../assets/icons/area.png";
import PriceIcon from "../../assets/icons/price-tag.png";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room, id }) => {
   const [isFullImage, setIsFullImage] = useState(false);

   const navigate = useNavigate();

   return (
      <div className="room-card">
         <Row>
            <Col
               xs={12}
               sm={12}
               md={12}
               lg={4}
               xl={4}
               xxl={4}
               className="room-card__image"
               onClick={() => {
                  setIsFullImage(!isFullImage);
               }}
            >
               <Image
                  src={"http://localhost:5000/"+ room?.images[0].image_path}
                  width="100%"
                  style={{ border: isFullImage ? "1px solid black" : "none" }}
               />
            </Col>
            {isFullImage ? (
               <Fragment>
                  <Col
                     xs={12}
                     sm={12}
                     md={12}
                     lg={4}
                     xl={4}
                     xxl={4}
                     className="room-card__full-image"
                  >
                     <Image
                        src={"http://localhost:5000/"+ room?.images[1].image_path}
                        width="100%"
                        style={{ border: "1px solid black" }}
                     />
                  </Col>
                  <Col
                     xs={12}
                     sm={12}
                     md={12}
                     lg={4}
                     xl={4}
                     xxl={4}
                     className="room-card__full-image"
                  >
                     <Image
                        src={"http://localhost:5000/"+ room?.images[2].image_path}
                        width="100%"
                        style={{
                           borderTopRightRadius: "0.5rem",
                           borderBottomRightRadius: "0.5rem",
                           border: "1px solid black",
                        }}
                     />
                  </Col>
               </Fragment>
            ) : (
               <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={8}
                  xxl={8}
                  className="room-card__body"
                  onClick={() => {
                     navigate("/room/" + id);
                  }}
               >
                  <div className="room-card__name one-line-restrict">
                     <p className="mb-1">{room?.name}</p>
                  </div>
                  <div className="room-card__description two-line-restrict">
                     <p className="mb-1">{room?.description}</p>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                     <div className="d-flex align-items-center">
                        <Image src={PriceIcon} width="24px" height="24px" />
                        <p className="mb-0 ms-2">{room?.price}</p>
                     </div>
                     <div className="d-flex align-items-center">
                        <Image src={AreaIcon} width="24px" height="24px" />
                        <p className="mb-0 ms-2">{room?.area}</p>
                     </div>
                  </div>
                  {/* <div className="room-card__rating mt-3">
                     <p className="mb-1">
                        {room.rating.toFixed(1)}/5.0 &nbsp; (&nbsp;
                        {room.comment}
                        {room.comment < 2 ? " comment )" : " comments )"}
                     </p>
                  </div> */}
               </Col>
            )}
         </Row>
      </div>
   );
};

export default RoomCard;
