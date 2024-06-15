import { createContext, useState } from "react";

export const SearchContext = createContext({
   searchInfo: {},
   setSearchInfo: () => null,
});


export const SearchProvider = ({ children }) => {
  const [searchInfo, setSearchInfo] = useState({
   stayingDate : "",
   leavingDate : "",
   roomType : 1,
   roomNumber : 1,
   hotelName : "",
   hotelAddress:""
  });
  const value = { searchInfo, setSearchInfo };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
