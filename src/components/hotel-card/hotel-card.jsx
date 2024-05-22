import "./hotel-card.scss";

import { Image, Carousel } from "react-bootstrap";
import BlackStarIcon from "../../assets/icons/black-star.png";
import RightArrowIcon from "../../assets/icons/right-arrow.png";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
   const navigate = useNavigate();

   return (
      <div className="hotel-card">
         <div className="hotel-card__image">
            <Carousel
               interval={null}
               onClick={(e) => {
                  console.log(e.target.className.includes());
                  if (
                     !e.target.className.includes(
                        "carousel-control-next-icon"
                     ) &&
                     !e.target.className.includes("carousel-control-prev-icon")
                  ) {
                     navigate("/hotel/1");
                  }
               }}
            >
               {hotel.images.map((image, imageIndex) => (
                  <Carousel.Item key={imageIndex}>
                     <Image src={image} width="100%" />
                  </Carousel.Item>
               ))}
            </Carousel>
         </div>
         <div
            className="hotel-card__body"
            onClick={() => {
               navigate("/hotel/1");
            }}
         >
            <p
               style={{ fontWeight: "bold" }}
               className="one-line-restrict d-flex justify-content-between align-items-center"
            >
               {hotel.name}
            </p>
            <p className="two-line-restrict">{hotel.description}</p>
            <div className="d-flex align-items-center justify-content-between">
               <div className="hotel-card__price d-flex align-items-center">
                  <p className="mb-0 pe-1" style={{ fontWeight: 500 }}>
                     ${hotel.minPrice}
                  </p>
                  <Image src={RightArrowIcon} width="16px" />
                  <p className="mb-0 pe-1 ps-1" style={{ fontWeight: 500 }}>
                     ${hotel.maxPrice}
                  </p>
                  <p className="mb-0">/day</p>
               </div>
               <div className="hotel-card__rating d-flex align-items-center">
                  <p className="mb-0">{hotel.rating.toFixed(2)} &nbsp;</p>
                  <Image src={BlackStarIcon} width="20px" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default HotelCard;
