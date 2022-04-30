import React, { useEffect, useState } from "react";
import { ClaimReceivableModalTBody, ClaimReceivableModalTHead } from "./core";
import { claimReceivableTHeadTBodyStyle } from "./styles";

export const ClaimReceivableModalTable = ({
   claimReceivables = [],
   triggerBool,
   triggerReceivables,
}) => {
   const classes = claimReceivableTHeadTBodyStyle();

   const [receivables, setReceivables] = useState(claimReceivables);

   function passReceivable(receivableData) {
      setReceivables(
         receivables.map((receivable) => {
            if (receivable._id === receivableData._id) {
               return receivableData;
            }
            return receivable;
         })
      );
   }

   const filledReceivables = receivables.filter((receivable) => receivable.filled);

   const receivablesAreFilled = filledReceivables.length === receivables.length;

   useEffect(() => {
      triggerBool && triggerBool(receivablesAreFilled);
   }, [receivablesAreFilled]);

   useEffect(() => {
      triggerReceivables && triggerReceivables(receivables);
   }, [receivables]);

   return (
      <div className={classes.receivableContainerStyle}>
         <ClaimReceivableModalTHead />
         <div>
            {receivables.map((item, index) => (
               <ClaimReceivableModalTBody
                  key={index}
                  receivable={{ ...item, filled: false }}
                  passReceivable={passReceivable}
               />
            ))}
         </div>
      </div>
   );
};
