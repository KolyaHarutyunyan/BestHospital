import React, { useState } from "react";

export const BookDemoContext = React.createContext({
   bookDemoModalIsOpen: false,
   handleModalOpenClose: () => {},
});

export const BookDemoContextProvider = ({ children }) => {
   const [bookDemoModalIsOpen, setBookDemoModalIsOpen] = useState(false);

   function handleModalOpenClose() {
      setBookDemoModalIsOpen((prevState) => !prevState);
   }

   const context = { bookDemoModalIsOpen, handleModalOpenClose };

   return <BookDemoContext.Provider value={context}>{children}</BookDemoContext.Provider>;
};
