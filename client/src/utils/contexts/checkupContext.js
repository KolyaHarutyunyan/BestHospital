import React from "react";

export const CheckupContext = React.createContext({
   itemsAreChecked: false,
   handleItemsCheckup: () => {},
});

export const CheckupContextProvider = ({ children }) => {
   const [itemsAreChecked, setItemsAreChecked] = React.useState(false);

   const handleItemsCheckup = (boolean) => setItemsAreChecked(boolean);

   const context = { itemsAreChecked, handleItemsCheckup };

   return <CheckupContext.Provider value={context}>{children}</CheckupContext.Provider>;
};
