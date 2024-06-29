import { useSelector } from "react-redux";
import "./booked.scss";
import { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { Col, Image, Row } from "react-bootstrap";
import RoomImage1 from "../../../assets/images/room/room1.jpg";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

const Booked = () => {
   const { userInformation } = useSelector((state) => state.userLogin);

   const config = useMemo(() => {
      return {
         headers: {
            Authorization: `Bearer ${userInformation?.token}`,
            "Content-Type": "application/json",
         },
      };
   }, [userInformation]);

   const [booked, setBooked] = useState([]);

   const formatDateToYYYYMMDD = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
   };

   const formatDateToDDMMYYYY = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
   }

   const handlePay = (book) => {
      console.log(book);
      const stripePromise = loadStripe(
         "pk_test_51PSkT409CjVZ9SFrI7pltt9o8Sl3U80jw90KcsEz214bt4RVloPTXpQBorGvJadjbScKaYzgKVsT9mk4J6A11VWE0060ueRvxj"
      );
      axios
         .post(
            "/create-checkout-session",
            {
               roomId: book.room_id,
               stayingDate: formatDateToYYYYMMDD(new Date(book.staying_date)),
               leavingDate: formatDateToYYYYMMDD(new Date(book.leaving_date)),
               successUrl: "http://localhost:3000/success?id=" + book.bookId,
               cancelUrl: "http://localhost:3000/fail",
            },
            config
         )
         .then(async ({ data }) => {
            console.log(data);
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({
               sessionId: data.sessionId,
            });
         })
         .catch((error) => {
            console.error(error);
         });
   };

   useEffect(() => {
      setBooked([]);
      axios
         .get("/get-booking?pageNumber=1&pageSize=1000", config)
         .then(({ data }) => {
            console.log(data);
            // setBooked(data.data);
            for (let i = 0; i < data.data.length; i++) {
               axios
                  .get(`/get-image/${data.data[i].room_id}?imageType=1`, config)
                  .then((images) => {
                     console.log(images);
                     setBooked((prevStatus) => [
                        ...prevStatus,
                        { ...data.data[i], images: images },
                     ]);
                  })
                  .catch((error) => {
                     console.error(error);
                  });
            }
         })
         .then((error) => {
            console.error(error);
         });
   }, [config]);

   return (
      <div className="booked">
         <h4 className="mb-4">Booked</h4>
         <div className="booked__item">
            {booked.map((book, index) => (
               <div key={index} className="booked__body">
                  <div className="mb-4 d-flex">
                     <div style={{ width: "20%" }}>
                        <Image
                           src={
                              book.images.length > 0
                                 ? "http://localhost:5000/" +
                                   book.images[0].image_path
                                 : RoomImage1
                           }
                           style={{
                              borderTopLeftRadius: "0.5rem",
                              borderBottomLeftRadius: "0.5rem",
                           }}
                           width="100%"
                        />
                     </div>

                     <div style={{ width: "70%" }} className="booked__main p-3">
                        <div className="d-flex">
                           <p style={{ width: "10rem" }} className="text-start">
                              Address
                           </p>
                           <p className="text-start"> {book?.address}</p>
                        </div>
                        <hr />
                        <div className="d-flex">
                           <p style={{ width: "10rem" }} className="text-start">
                              Booking Date
                           </p>
                           <p className="text-start">
                              {formatDateToDDMMYYYY(
                                 new Date(book?.booking_date)
                              )}
                           </p>
                        </div>
                        <hr />
                        <div className="d-flex">
                           <p style={{ width: "8rem" }} className="text-start">
                              Staying Date
                           </p>
                           <p className="text-start" style={{ width: "10rem" }}>
                              {formatDateToDDMMYYYY(
                                 new Date(book?.staying_date)
                              )}
                           </p>
                           <p style={{ width: "8rem" }} className="text-start">
                              Leaving Date
                           </p>
                           <p className="text-start">
                              {formatDateToDDMMYYYY(
                                 new Date(book?.leaving_date)
                              )}
                           </p>
                        </div>
                        <hr />
                        <div className="d-flex">
                           <p style={{ width: "8rem" }} className="text-start">
                              Price
                           </p>
                           <p className="text-start" style={{ width: "10rem" }}>
                              ${book?.price}/day
                           </p>
                           <p style={{ width: "8rem" }} className="text-start">
                              Star
                           </p>
                           <p className="text-start">{book.star}</p>
                        </div>
                        <div className="d-flex"></div>
                     </div>
                     <div
                        style={{
                           width: "10%",
                           backgroundColor:
                              book.status === 0 ? "#6d66c8" : "orange",
                        }}
                        
                        className={`d-flex flex-column booked__button justify-content-center ${book.status === 0 ? "is-pay" : ""}`}
                        onClick={() => {
                           if(book.status === 1) return;
                           handlePay(book);
                        }}
                     >
                        {book.status === 0 ? (
                           <Fragment>
                              <div>P</div>
                              <div>A</div>
                              <div>Y</div>
                           </Fragment>
                        ) : (
                           <Fragment>
                              <div>D</div>
                              <div>O</div>
                              <div>N</div>
                              <div>E</div>
                           </Fragment>
                        )}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Booked;
