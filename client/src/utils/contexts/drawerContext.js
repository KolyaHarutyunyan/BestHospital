import React from "react";

export const DrawerContext = React.createContext({
   open: false,
   handleDrawerOpenClose: () => {},
});

export const DrawerContextProvider = ({ children }) => {
   const [open, setOpen] = React.useState(false);

   const handleDrawerOpenClose = () => setOpen((prevState) => !prevState);

   const context = { open, handleDrawerOpenClose };

   return (
      <DrawerContext.Provider value={context}>
         {children}
      </DrawerContext.Provider>
   );
};
