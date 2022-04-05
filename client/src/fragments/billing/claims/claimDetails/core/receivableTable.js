import React from "react";
import { ReceivableTBody, ReceivableTHead } from "./common";
import { claimDetailsCoreStyle } from "./styles";

export const ReceivableTable = ({ claimReceivables = [] }) => {
   const classes = claimDetailsCoreStyle();

   return (
      <div className={classes.receivableContainerStyle}>
         <ReceivableTHead />
         <div>
            {claimReceivables.map((item, index) => (
               <ReceivableTBody key={index} receivable={item} />
            ))}
         </div>
      </div>
   );
};
