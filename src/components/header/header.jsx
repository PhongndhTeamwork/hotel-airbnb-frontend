import "./header.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faTools, faEnvelope, faBed, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
const Header = () => {
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

   const handleOption = (name, operation) =>{
      setOptions((prev) => {
         return{
            ...prev,
            [name]: operation==="i"?options[name]+1:options[name]-1,
         };
      });
   };

   return (
      <div className="header">
         <div className="header-container">

            <div className="header-list">
               <div className="header-list__item">
                  <FontAwesomeIcon icon={faHome} />
                  <a href="#home">Home</a>
               </div>
               <div className="header-list__item">
                  <FontAwesomeIcon icon={faInfoCircle} className="header-list__icon" />
                  <a href="#about">About</a>
               </div>
               <div className="header-list__item">
                  <FontAwesomeIcon icon={faTools} className="header-list__icon" />
                  <a href="#services">Services</a>
               </div>
               <div className="header-list__item">
                  <FontAwesomeIcon icon={faEnvelope} className="header-list__icon" />
                  <a href="#contact">Contact</a>
               </div>

            </div>
            {/* <h1 className="header-title">A lifetime of discount?</h1>
            <p className="header-desc">Book right now || be gay</p>
            <button className="header-btn">Sign in / Register</button> */}
            <div className="header-search">
               <div className="header-search__item">
                  <FontAwesomeIcon icon={faBed} className="header-icon" />
                  <input type="text"
                     placeholder="Where are you going?"
                     className="header-search-input" />

               </div>
               <div className="header-search__item">
                  <FontAwesomeIcon icon={faCalendarDays} className="header-icon" />
                  <span onClick={() => setOpenDate(!openDate)} className="header-search__text">{`${format(
                     date[0].startDate, "dd/MM/yyyy")} to
                     ${format(date[0].endDate, "dd/MM/yyyy")}`
                  }</span>
                  {openDate && <DateRange
                     editableDateInputs={true}
                     onChange={(item) => setDate([item.selection])}
                     showSelectionPreview={true}
                     moveRangeOnFirstSelection={false}
                     // months={2}
                     ranges={date}
                     direction="horizontal"
                     className="date"
                  />}

               </div>

               <div className="header-search__item">
                  <FontAwesomeIcon icon={faPerson} className="header-icon" />
                  <span onClick={()=>setOpenOptions(!openOptions)}className="header-search__text">{`${options.adult} adult • ${options.children} children • ${options.pet} pet`}</span>
                  {openOptions && <div className="options">
                     <div className="option-item">
                        <span className="option-text">Adult</span>
                        <div className="option-counter">
                           <button disabled={options.adult <= 1} className="option-btn" onClick={()=>handleOption("adult","d")}>-</button>
                           <span className="option-number">{`${options.adult}`}</span>
                           <button className="option-btn" onClick={()=>handleOption("adult","i")}>+</button>
                        </div>
                     </div>
                     <div className="option-item">
                        <span className="option-text">Children</span>
                        <div className="option-counter">
                           <button disabled={options.children <= 0} className="option-btn" onClick={()=>handleOption("children","d")}>-</button>
                           <span className="option-number">{`${options.children}`}</span>
                           <button className="option-btn" onClick={()=>handleOption("children","i")}>+</button>
                        </div>
                     </div>
                     <div className="option-item">
                        <span  className="option-text">Pet</span>
                        <div className="option-counter">
                           <button disabled={options.pet <= 0} className="option-btn" onClick={()=>handleOption("pet","d")}>-</button>
                           <span className="option-number">{`${options.pet}`}</span>
                           <button className="option-btn" onClick={()=>handleOption("pet","i")}>+</button>
                        </div>
                     </div>
                  </div>}
               </div>

               <div className="header-search__item">
                  <button className="header-btn">Search</button>

               </div>

            </div>
         </div>


      </div>

   )
}



export default Header;