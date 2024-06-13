import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faHome,
   faInfoCircle,
   faTools,
   faEnvelope,
   faBed,
   faCalendarDays,
   faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./search-bar.scss"; // theme css file

import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { Button } from "@mui/material/";


// import { Button } from "@mui/material";

const SearchBar = () => {
   const [openDate, setOpenDate] = useState(false);
   const [date, setDate] = useState([
      {
         startDate: new Date(),
         endDate: new Date(),
         key: "selection",
      },
   ]);

   const [openOptions, setOpenOptions] = useState(false);
   const [options, setOptions] = useState({
      adult: 1,
      children: 0,
      pet: 0,
   });

   const handleOption = (name, operation) => {
      setOptions((prev) => {
         return {
            ...prev,
            [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
         };
      });
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
               >{`${options.adult} adult • ${options.children} children • ${options.pet} pet`}</span>
               {openOptions && (
                  <div className="options">
                     <div className="option-item">
                        <span className="option-text">Adult</span>
                        <div className="option-counter">
                           <Button
                              disabled={options.adult <= 1}
                              className="option-btn"
                              onClick={() => handleOption("adult", "d")}
                              variant="outlined"
                              color="inherit"
                           >
                              -
                           </Button>
                           <p className="option-number">{`${options.adult}`}</p>
                           <Button
                              className="option-btn"
                              onClick={() => handleOption("adult", "i")}
                              variant="outlined"
                              color="inherit"
                           >
                              +
                           </Button>
                        </div>
                     </div>
                     <div className="option-item">
                        <span className="option-text">Children</span>
                        <div className="option-counter">
                           <Button
                              disabled={options.children <= 0}
                              className="option-btn"
                              onClick={() => handleOption("children", "d")}
                              variant="outlined"
                              color="inherit"
                           >
                              -
                           </Button>
                           <p className="option-number">{`${options.children}`}</p>
                           <Button
                              className="option-btn"
                              onClick={() => handleOption("children", "i")}
                              variant="outlined"
                              color="inherit"
                           >
                              +
                           </Button>
                        </div>
                     </div>
                     <div className="option-item">
                        <span className="option-text">Pet</span>
                        <div className="option-counter">
                           <Button
                              disabled={options.pet <= 0}
                              className="option-btn"
                              onClick={() => handleOption("pet", "d")}
                              variant="outlined"
                              color="inherit"
                           >
                              -
                           </Button>
                           <p className="option-number">{`${options.pet}`}</p>
                           <Button
                              className="option-btn"
                              onClick={() => handleOption("pet", "i")}
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
               <Button className="header-btn" variant="outlined" color="inherit">
                  Search
               </Button>
            </div>
         </div>
      </div>
   );
};

export default SearchBar;
