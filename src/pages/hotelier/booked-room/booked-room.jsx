import { useSelector } from "react-redux";
import "./booked-room.scss";
import { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Button, Image } from "react-bootstrap";
import RoomImage1 from "../../../assets/images/room/room1.jpg";

const BookedRoom = () => {
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
   const [pageTotal, setPageTotal] = useState(1);
   const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
      setBooked([]);
      axios
         .get("/get-booking-as-hotelier?pageSize=12&pageNumber=1", config)
         .then(({ data }) => {
            setPageTotal(data.pageTotal);
            for (let i = 0; i < data.data.length; i++) {
               axios
                  .get(`/get-image/${data.data[i].room_id}?imageType=1`, config)
                  .then((images) => {
                     setBooked((prevStatus) => [
                        ...prevStatus,
                        { ...data.data[i], images: images.data },
                     ]);
                  })
                  .catch((error) => {
                     console.error(error);
                  });
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, [config]);

   const handleChangePage = (page) => {
      window.scrollTo(0, 0);
      setBooked([]);
      axios
         .get(`/get-booking-as-hotelier?pageNumber=${page}&pageSize=12`, config)
         .then(({ data }) => {
            // console.log(data);
            // setAllHotels(data.data);
            setPageTotal(data.pageTotal);
            for (let i = 0; i < data.data.length; i++) {
               axios
                  .get(`/get-image/${data.data[i].id}?imageType=0`, config)
                  .then((images) => {
                     setBooked((prevStatus) => [
                        ...prevStatus,
                        { ...data.data[i], images: images.data },
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
   };

   const formatDateToDDMMYYYY = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
   };

   return (
      <div>
         {/* <Button onClick={() => {
            console.log(booked)
         }}>Click</Button> */}
         <div className="booked">
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
                              Hotel
                           </p>
                           <p className="text-start"> {book?.name}</p>
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
                        className={`d-flex flex-column booked__button justify-content-center`}
                     >
                        {book.status === 0 ? (
                           <Fragment>
                              <div>W</div>
                              <div>A</div>
                              <div>I</div>
                              <div>T</div>
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
         <div className="mt-3 home__pagination d-flex justify-content-center">
            <PaginationControl
               page={currentPage}
               between={4}
               total={pageTotal * 12}
               // total={pageTotal}
               limit={12}
               changePage={(page) => {
                  handleChangePage(page);
                  setCurrentPage(page);
               }}
               ellipsis={1}
            />
         </div>
      </div>
   );
};

export default BookedRoom;
