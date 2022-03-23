import React from "react";

export const PaginationContext = React.createContext({
   pageIsChanging: false,
   handlePageChange: () => {},
});

export const PaginationContextProvider = ({ children }) => {
   const [pageIsChanging, setPageIsChanging] = React.useState(false);

   const handlePageChange = (boolean) => setPageIsChanging(boolean);

   const context = { pageIsChanging, handlePageChange };

   return (
      <PaginationContext.Provider value={context}>
         {children}
      </PaginationContext.Provider>
   );
};
