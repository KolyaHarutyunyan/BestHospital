import React from "react";

export const EditablePaymentContext = React.createContext({
   allowedAMT: "",
   deductible: "",
   copay: "",
   coINS: "",
   paidAMT: "",
   handleAllowedAMTValue: () => {},
   handleDeductibleValue: () => {},
   handleCopayValue: () => {},
   handleCoINSValue: () => {},
   handlePaidAMTValue: () => {},
});

export const EditablePaymentContextProvider = ({ children }) => {
   const [allowedAMT, setAllowedAMT] = React.useState("");
   const [deductible, setDeductible] = React.useState("");
   const [copay, setCopay] = React.useState("");
   const [coINS, setCoINS] = React.useState("");
   const [paidAMT, setPaidAMT] = React.useState("");

   const handleAllowedAMTValue = (value) => setAllowedAMT(value);
   const handleDeductibleValue = (value) => setDeductible(value);
   const handleCopayValue = (value) => setCopay(value);
   const handleCoINSValue = (value) => setCoINS(value);
   const handlePaidAMTValue = (value) => setPaidAMT(value);

   const context = {
      allowedAMT,
      deductible,
      copay,
      coINS,
      paidAMT,
      handleAllowedAMTValue,
      handleDeductibleValue,
      handleCopayValue,
      handleCoINSValue,
      handlePaidAMTValue,
   };

   return (
      <EditablePaymentContext.Provider value={context}>
         {children}
      </EditablePaymentContext.Provider>
   );
};
