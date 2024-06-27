import "./amenities-modification.scss";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

import BreakfastIcon from "../../../assets/icons/breakfast.png";
import CaveIcon from "../../../assets/icons/cave.png";
import GolfIcon from "../../../assets/icons/golf.png";
import LakeIcon from "../../../assets/icons/lake.png";
import SkiingIcon from "../../../assets/icons/skiing.png";
import SurfingIcon from "../../../assets/icons/surfing.png";
import BeachIcon from "../../../assets/icons/beach.png";
import SeawardIcon from "../../../assets/icons/seaward.png";
import PoolIcon from "../../../assets/icons/swimming-pool.png";
import IslandIcon from "../../../assets/icons/island.png";
import TreeHouseIcon from "../../../assets/icons/tree-house.png";
import UndergroundHouseIcon from "../../../assets/icons/underground-house.png";
import CampingIcon from "../../../assets/icons/camping.png";
import DesertIcon from "../../../assets/icons/desert.png";
import PianoIcon from "../../../assets/icons/piano.png";
import ZooIcon from "../../../assets/icons/zoo.png";
import HouseBoatIcon from "../../../assets/icons/house-boat.png";
import TowerIcon from "../../../assets/icons/control-tower.png";
import SmartCityIcon from "../../../assets/icons/smart-city.png";
import HistoricalSiteIcon from "../../../assets/icons/historic-site.png";
import FarmIcon from "../../../assets/icons/farm.png";
import RoomIcon from "../../../assets/icons/bedroom.png";
import { Button } from "@mui/material/";
import { XCircle, PencilSquare, PlusCircle } from "react-bootstrap-icons";

import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";

import axios from "axios";

// const services = [
//    {
//       name: "Breakfast",
//       icon: BreakfastIcon,
//    },
//    {
//       name: "Cave",
//       icon: CaveIcon,
//    },
//    {
//       name: "Golf",
//       icon: GolfIcon,
//    },
//    {
//       name: "Lake",
//       icon: LakeIcon,
//    },
//    {
//       name: "Skiing",
//       icon: SkiingIcon,
//    },
//    {
//       name: "Surfing",
//       icon: SurfingIcon,
//    },
//    {
//       name: "Beach",
//       icon: BeachIcon,
//    },
//    {
//       name: "Seaward",
//       icon: SeawardIcon,
//    },
//    {
//       name: "Skiing",
//       icon: SkiingIcon,
//    },
//    {
//       name: "Pool",
//       icon: PoolIcon,
//    },
//    {
//       name: "Island",
//       icon: IslandIcon,
//    },
//    {
//       name: "Tree House",
//       icon: TreeHouseIcon,
//    },
//    {
//       name: "Underground",
//       icon: UndergroundHouseIcon,
//    },
//    {
//       name: "Camping",
//       icon: CampingIcon,
//    },
//    {
//       name: "Desert",
//       icon: DesertIcon,
//    },
//    {
//       name: "Piano",
//       icon: PianoIcon,
//    },
//    {
//       name: "Room",
//       icon: RoomIcon,
//    },
//    {
//       name: "Zoo",
//       icon: ZooIcon,
//    },
//    {
//       name: "House Boat",
//       icon: HouseBoatIcon,
//    },
//    {
//       name: "Tower",
//       icon: TowerIcon,
//    },
//    {
//       name: "Smart City",
//       icon: SmartCityIcon,
//    },
//    {
//       name: "Historical Site",
//       icon: HistoricalSiteIcon,
//    },
//    {
//       name: "Farm",
//       icon: FarmIcon,
//    },
// ];

const AmenitiesModification = () => {
   const navigate = useNavigate();
   const { userInformation } = useSelector((state) => state.userLogin);
   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${userInformation?.token}`,
            "Content-Type": "application/json",
         },
      };
   }, [userInformation]);
   const [services, setServices] = useState();

   const getServices = useCallback(() => {
      axios
         .get("/get-service", config)
         .then(({ data }) => {
            console.log(data);
            setServices(data);
         })
         .catch((error) => {
            console.error(error);
         });
   },[config])

   

   useEffect(() => {
     getServices();
   }, [getServices]);

   const handleRemove = (id) => {
      const isConfirm = window.confirm(
         "Are you sure you want to delete this service"
      );
      if (!isConfirm) return;
      axios
         .delete("/delete-service/" + id, config)
         .then(({ data }) => {
            console.log(data);
            alert("Removed service successfully");
            getServices();
         })
         .catch((error) => {
            console.error(error);
         });
   };

   return (
      <div className="amenities-modification">
         <Button
            variant="outlined"
            color="success"
            className="d-flex align-items-center px-4 my-3"
            style={{ margin: "0 auto" }}
            onClick={() => {
               navigate("/admin/add-amenity");
            }}
         >
            <PlusCircle size="20px" /> &nbsp; Add New Service
         </Button>
         <div className="amenities-modification__table">
            <MDBTable>
               <MDBTableHead>
                  <tr className="table-danger">
                     <th className="text-start" scope="col">
                        #
                     </th>
                     <th className="text-start" scope="col">
                        Icon
                     </th>
                     <th className="text-start" scope="col">
                        Name
                     </th>
                     <th scope="col">Action</th>
                  </tr>
               </MDBTableHead>
               <MDBTableBody>
                  {services?.map((service, index) => (
                     <tr
                        key={index}
                        className={
                           index % 3 === 0
                              ? "table-primary"
                              : index % 3 === 1
                              ? "table-warning"
                              : "table-info"
                        }
                     >
                        <th scope="row" className="text-start">
                           {index + 1}
                        </th>
                        <td className="text-start">
                           <Image
                              src={
                                 "http://localhost:5000/" + service?.image_path
                              }
                              width="20px"
                           />
                        </td>
                        <td className="text-start">{service?.name}</td>
                        <td className="text-center">
                           <Button
                              variant="contained"
                              color="error"
                              onClick={() => {
                                 handleRemove(service?.id);
                              }}
                           >
                              <XCircle /> &nbsp; Remove
                           </Button>
                           <Button
                              variant="contained"
                              color="info"
                              className="mx-2"
                              onClick={() => {
                                 navigate("/admin/edit-amenity/" + service?.id);
                              }}
                           >
                              <PencilSquare />
                              &nbsp; Edit
                           </Button>
                        </td>
                     </tr>
                  ))}
               </MDBTableBody>
            </MDBTable>
         </div>
      </div>
   );
};

export default AmenitiesModification;
