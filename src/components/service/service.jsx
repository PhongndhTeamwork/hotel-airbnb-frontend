import "./service.scss";
import BreakfastIcon from "../../assets/icons/breakfast.png";
import CaveIcon from "../../assets/icons/cave.png";
import GolfIcon from "../../assets/icons/golf.png";
import LakeIcon from "../../assets/icons/lake.png";
import SkiingIcon from "../../assets/icons/skiing.png";
import SurfingIcon from "../../assets/icons/surfing.png";
import BeachIcon from "../../assets/icons/beach.png";
import SeawardIcon from "../../assets/icons/seaward.png";
import PoolIcon from "../../assets/icons/swimming-pool.png";
import IslandIcon from "../../assets/icons/island.png";
import TreeHouseIcon from "../../assets/icons/tree-house.png";
import UndergroundHouseIcon from "../../assets/icons/underground-house.png";
import CampingIcon from "../../assets/icons/camping.png";
import DesertIcon from "../../assets/icons/desert.png";
import PianoIcon from "../../assets/icons/piano.png";
import ZooIcon from "../../assets/icons/zoo.png";
import HouseBoatIcon from "../../assets/icons/house-boat.png";
import TowerIcon from "../../assets/icons/control-tower.png";
import SmartCityIcon from "../../assets/icons/smart-city.png";
import HistoricalSiteIcon from "../../assets/icons/historic-site.png";
import FarmIcon from "../../assets/icons/farm.png";
import RoomIcon from "../../assets/icons/bedroom.png";
import RightChevronIcon from "../../assets/icons/right-chevron.png";
import LeftChevronIcon from "../../assets/icons/left-chevron.png";
import { useEffect, useRef, useState } from "react";

const Service = () => {
   const services = [
      {
         name: "Breakfast",
         icon: BreakfastIcon,
      },
      {
         name: "Cave",
         icon: CaveIcon,
      },
      {
         name: "Golf",
         icon: GolfIcon,
      },
      {
         name: "Lake",
         icon: LakeIcon,
      },
      {
         name: "Skiing",
         icon: SkiingIcon,
      },
      {
         name: "Surfing",
         icon: SurfingIcon,
      },
      {
         name: "Beach",
         icon: BeachIcon,
      },
      {
         name: "Seaward",
         icon: SeawardIcon,
      },
      {
         name: "Skiing",
         icon: SkiingIcon,
      },
      {
         name: "Pool",
         icon: PoolIcon,
      },
      {
         name: "Island",
         icon: IslandIcon,
      },
      {
         name: "Tree House",
         icon: TreeHouseIcon,
      },
      {
         name: "Underground",
         icon: UndergroundHouseIcon,
      },
      {
         name: "Camping",
         icon: CampingIcon,
      },
      {
         name: "Desert",
         icon: DesertIcon,
      },
      {
         name: "Piano",
         icon: PianoIcon,
      },
      {
         name: "Room",
         icon: RoomIcon,
      },
      {
         name: "Zoo",
         icon: ZooIcon,
      },
      {
         name: "House Boat",
         icon: HouseBoatIcon,
      },
      {
         name: "Tower",
         icon: TowerIcon,
      },
      {
         name: "Smart City",
         icon: SmartCityIcon,
      },
      {
         name: "Historical Site",
         icon: HistoricalSiteIcon,
      },
      {
         name: "Farm",
         icon: FarmIcon,
      },
   ];

   const movePixelSize = 250;

   const serviceBodyRef = useRef(null);
   const serviceItemsRef = useRef(null);

   const [serviceBodyWidth, setServiceBodyWidth] = useState(0);
   const [serviceItemsWidth, setServiceItemsWidth] = useState(0);

   useEffect(() => {
      setServiceBodyWidth(serviceBodyRef.current.offsetWidth);
      setServiceItemsWidth(serviceItemsRef.current.offsetWidth);
   }, [serviceBodyRef, serviceItemsRef]);

   const handleClickLeftChevron = () => {
      const currentTranslateX = getTranslateX(serviceItemsRef.current);
      if (movePixelSize + currentTranslateX < 0) {
         serviceItemsRef.current.style.transform = `translateX(${
            movePixelSize + currentTranslateX
         }px)`;
      } else {
         serviceItemsRef.current.style.transform = `translateX(${0}px)`;
      }
   };

   const handleClickRightChevron = () => {
      const currentTranslateX = getTranslateX(serviceItemsRef.current);
      if (
         -movePixelSize + currentTranslateX >
         serviceBodyWidth - serviceItemsWidth
      ) {
         serviceItemsRef.current.style.transform = `translateX(${
            -movePixelSize + currentTranslateX
         }px)`;
      } else {
         serviceItemsRef.current.style.transform = `translateX(${
            serviceBodyWidth - serviceItemsWidth
         }px)`;
      }
   };

   const getTranslateX = (element) => {
      const style = window.getComputedStyle(element);
      const transform = style.transform || style.mozTransform;

      if (transform && transform !== "none") {
         const matrix = new DOMMatrixReadOnly(transform);
         return matrix.m41; // m41 is the `translateX` value in the matrix
      }
      return 0; // Default to 0 if there's no transform
   };

   return (
      <div className="service d-flex">
         <div
            style={{
               width: "24px",
               height: "24px",
               backgroundImage: `url(${LeftChevronIcon})`,
               backgroundSize: "cover",
               display: serviceBodyWidth > serviceItemsWidth ? "none" : "",
            }}
            className="service__left-chevron"
            onClick={() => {
               handleClickLeftChevron();
            }}
         ></div>
         <div className="service__body" ref={serviceBodyRef}>
            <div className="service__items" ref={serviceItemsRef}>
               {services.map((service, index) => (
                  <div className="service__item" key={index}>
                     <div
                        style={{
                           width: "30px",
                           height: "30px",
                           backgroundImage: `url(${service.icon})`,
                           backgroundSize: "cover",
                        }}
                     ></div>
                     <p className="mt-1">{service.name}</p>
                  </div>
               ))}
            </div>
         </div>
         <div
            style={{
               width: "24px",
               height: "24px",
               backgroundImage: `url(${RightChevronIcon})`,
               backgroundSize: "cover",
               display: serviceBodyWidth > serviceItemsWidth ? "none" : "",
            }}
            className="service__right-chevron"
            onClick={() => {
               handleClickRightChevron();
            }}
         ></div>
      </div>
   );
};

export default Service;
