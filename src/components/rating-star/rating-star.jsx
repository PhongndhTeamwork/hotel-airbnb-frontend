import { Fragment } from "react";
import "./rating-start.scss";
import { StarFill } from "react-bootstrap-icons";

const RatingStar = ({ rating }) => {
   return (
      <div className="d-flex">
         {rating === 1 ? (
            <Fragment>
               <StarFill size="16px" color="gold" />
            </Fragment>
         ) : rating === 2 ? (
            <Fragment>
               <StarFill size="16px" color="gold" />
               <StarFill className="ms-1" size="16px" color="gold" />
            </Fragment>
         ) : rating === 3 ? (
            <Fragment>
               <StarFill size="16px" color="gold" />
               <StarFill className="ms-1" size="16px" color="gold" />
               <StarFill className="ms-1" size="16px" color="gold" />
            </Fragment>
         ) : rating === 4 ? (
            <Fragment>
               <StarFill size="16px" color="gold" />
               <StarFill className="ms-1" size="16px" color="gold" />
               <StarFill className="ms-1" size="16px" color="gold" />
               <StarFill className="ms-1" size="16px" color="gold" />
            </Fragment>
         ) : (
            <Fragment>
               <StarFill size="16px" color="gold" />
               <StarFill className="ms-1" size="16px" color="gold" />
               <StarFill className="ms-1" size="16px" color="gold" />
               <StarFill className="ms-1" size="16px" color="gold" />
               <StarFill className="ms-1" size="16px" color="gold" />
            </Fragment>
         )}
      </div>
   );
};

export default RatingStar;
