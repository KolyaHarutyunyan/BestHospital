import React from "react";
import { CloseButton } from "@eachbase/components";
import { wrapperStyle } from "./styles";

export const BillingTransactionWrapper = ({ onClose, children }) => {
   const classes = wrapperStyle();

   return (
      <div className={classes.billingTransactionContainerStyle}>
         <div className={classes.billingTransactionTitleBoxStyle}>
            <h2 className={classes.billingTransactionTitleStyle}>billing transaction title here</h2>
            <CloseButton handleCLic={onClose} />
         </div>
         {children}
      </div>
   );
};
