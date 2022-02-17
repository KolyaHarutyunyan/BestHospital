import React from "react";
import { CloseButton } from "@eachbase/components";
import { wrapperStyle } from "./styles";

export const BillTransactionWrapper = ({ onClose, children }) => {
   const classes = wrapperStyle();

   return (
      <div className={classes.billTransactionContainerStyle}>
         <div className={classes.billTransactionTitleBoxStyle}>
            <h2 className={classes.billTransactionTitleStyle}>
               bill transaction title here
            </h2>
            <CloseButton handleCLick={onClose} />
         </div>
         {children}
      </div>
   );
};
