import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns";
import './order-card.scss'
const OrderCard = () => {
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
      <div className='order-card'>
         <div className="card-header">
            <span className='price'>$72</span>
            <span>/night</span>

         </div>
         {/* <div className="card-info-container"> */}
            <div className="card-info">
               <div className="card-info__item">
                  <FontAwesomeIcon icon={faCalendarDays} className="header-icon" />
                  <span onClick={() => setOpenDate(!openDate)} className="card-info__text">{`${format(
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
               <hr className="card-info__hr"/>     
               <div className="card-info__item">
                  <FontAwesomeIcon icon={faPerson} className="header-icon" />
                  <span onClick={() => setOpenOptions(!openOptions)} className="card-info__text">{`${options.adult} adult • ${options.children} children • ${options.pet} pet`}</span>
                  {openOptions && <div className="options">
                     <div className="option-item">
                        <span className="option-text">Adult</span>
                        <div className="option-counter">
                           <button disabled={options.adult <= 1} className="option-btn" onClick={() => handleOption("adult", "d")}>-</button>
                           <span className="option-number">{`${options.adult}`}</span>
                           <button className="option-btn" onClick={() => handleOption("adult", "i")}>+</button>
                        </div>
                     </div>
                     <div className="option-item">
                        <span className="option-text">Children</span>
                        <div className="option-counter">
                           <button disabled={options.children <= 0} className="option-btn" onClick={() => handleOption("children", "d")}>-</button>
                           <span className="option-number">{`${options.children}`}</span>
                           <button className="option-btn" onClick={() => handleOption("children", "i")}>+</button>
                        </div>
                     </div>
                     <div className="option-item">
                        <span className="option-text">Pet</span>
                        <div className="option-counter">
                           <button disabled={options.pet <= 0} className="option-btn" onClick={() => handleOption("pet", "d")}>-</button>
                           <span className="option-number">{`${options.pet}`}</span>
                           <button className="option-btn" onClick={() => handleOption("pet", "i")}>+</button>
                        </div>
                     </div>
                  </div>}
               </div>
            </div>
         {/* </div> */}

         
         <button className="card-btn">Book Room</button>
        
         
         <div className="order-sub-total">
            <span>
               $72 x 5 Nights
            </span>
            <span>
               $362
            </span>
         </div>
         <hr className='total-hr'/>            
         <div className="order-total">
            <span className='total-label'>
               Before taxes
            </span>
            <span  className='total-label'>
               $362
            </span>
         </div>

         

      </div>
   )
}

export default OrderCard;