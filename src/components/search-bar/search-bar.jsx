import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   // faHome,
   // faInfoCircle,
   // faTools,
   // faEnvelope,
   faBed,
   faCalendarDays,
   faPerson,
   faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./search-bar.scss"; // theme css file

import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { Button } from "@mui/material/";

import { SearchContext } from "../../contexts/search-context";

// import { Button } from "@mui/material";

const SearchBar = () => {
   const { searchInfo, setSearchInfo } = useContext(SearchContext);
   const [openDate, setOpenDate] = useState(false);
   const [date, setDate] = useState([
      {
         startDate: new Date(),
         endDate: new Date(),
         key: "selection",
      },
   ]);

   const [address, setAddress] = useState("");
   const [hotelName, setHotelName] = useState("");

   const [openOptions, setOpenOptions] = useState(false);
   const [options, setOptions] = useState({
      rooms: 1,
      type: 1,
   });

   const handleOption = (name, operation) => {
      setOptions((prev) => {
         return {
            ...prev,
            [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
         };
      });
   };

   const formatDateToYYYYMMDD = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
   };

   const handleSearch = () => {
      setSearchInfo({
         ...searchInfo,
         roomType: options.type,
         roomNumber: options.rooms,
         stayingDate: formatDateToYYYYMMDD(new Date(date[0].startDate)),
         leavingDate: formatDateToYYYYMMDD(new Date(date[0].endDate)),
         hotelName :address,
         hotelAddress:hotelName

      });
      console.log(searchInfo);
   };
   return (
      <div>
         <div className="header-search">
            <div className="header-search__item">
               <FontAwesomeIcon icon={faBed} className="header-icon" />
               <input
                  type="text"
                  placeholder="Where are you going?"
                  className="header-search-input"
                  onChange={(e) => {
                     setAddress(e.target.value);
                  }}
               />
            </div>
            <div className="header-search__item">
               <FontAwesomeIcon icon={faHouse} className="header-icon" />
               <input
                  type="text"
                  placeholder="Hotel"
                  className="header-search-input"
                  onChange={(e) => {
                     setHotelName(e.target.value);
                  }}
               />
            </div>
            <div className="header-search__item">
               <FontAwesomeIcon icon={faCalendarDays} className="header-icon" />
               <span
                  onClick={() => setOpenDate(!openDate)}
                  className="header-search__text"
               >{`${format(date[0].startDate, "dd/MM/yyyy")} to
                     ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
               {openDate && (
                  <DateRange
                     editableDateInputs={true}
                     onChange={(item) => setDate([item.selection])}
                     showSelectionPreview={true}
                     moveRangeOnFirstSelection={false}
                     // months={2}
                     ranges={date}
                     direction="horizontal"
                     className="date"
                  />
               )}
            </div>

            <div className="header-search__item">
               <FontAwesomeIcon icon={faPerson} className="header-icon" />
               <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="header-search__text"
               >{`rooms quantity ${options.rooms} • type ${options.type}`}</span>
               {openOptions && (
                  <div className="options">
                     <div className="option-item">
                        <span className="option-text">Rooms</span>
                        <div className="option-counter">
                           <Button
                              disabled={options.rooms <= 1}
                              className="option-btn"
                              onClick={() => handleOption("rooms", "d")}
                              variant="outlined"
                              color="inherit"
                           >
                              -
                           </Button>
                           <p className="option-number">{`${options.rooms}`}</p>
                           <Button
                              className="option-btn"
                              onClick={() => handleOption("rooms", "i")}
                              variant="outlined"
                              color="inherit"
                           >
                              +
                           </Button>
                        </div>
                     </div>
                     <div className="option-item">
                        <span className="option-text">Type</span>
                        <div className="option-counter">
                           <Button
                              disabled={options.type <= 1}
                              className="option-btn"
                              onClick={() => handleOption("type", "d")}
                              variant="outlined"
                              color="inherit"
                           >
                              -
                           </Button>
                           <p className="option-number">{`${options.type}`}</p>
                           <Button
                              className="option-btn"
                              onClick={() => handleOption("type", "i")}
                              variant="outlined"
                              color="inherit"
                           >
                              +
                           </Button>
                        </div>
                     </div>
                  </div>
               )}
            </div>

            <div className="header-search__item">
               <Button
                  className="header-btn"
                  variant="outlined"
                  color="inherit"
                  onClick={() => {
                     handleSearch();
                  }}
               >
                  Search
               </Button>
            </div>
         </div>
      </div>
   );
};

export default SearchBar;
