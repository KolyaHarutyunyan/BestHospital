import React from "react";
import { CloseButton } from "@eachbase/components";
import { wrapperStyle } from "./styles";

export const BillTransactionWrapper = ({
   onClose,
   titleContent,
   subtitleContent,
   children,
}) => {
   const classes = wrapperStyle();

   return (
      <div className={classes.billTransactionContainerStyle}>
         <CloseButton handleCLic={onClose} />
         <div className={classes.billTransactionTitleBoxStyle}>
            <h2 className={classes.transactionTitle}>{titleContent}</h2>
            <p className={classes.transactionSubtitle}>{subtitleContent}</p>
         </div>
         {children}
      </div>
   );
};
