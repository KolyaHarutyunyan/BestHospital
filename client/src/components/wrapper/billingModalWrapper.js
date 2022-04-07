import React from "react";
import { CloseButton } from "@eachbase/components";
import { wrapperStyle } from "./styles";

export const BillingModalWrapper = ({
   onClose,
   titleContent,
   subtitleContent,
   children,
   wrapperStylesName,
}) => {
   const classes = wrapperStyle();

   const wrapperClassName = `${classes.billTransactionContainerStyle} ${wrapperStylesName}`;

   return (
      <div className={wrapperClassName}>
         <CloseButton handleCLic={onClose} />
         <div className={classes.billTransactionTitleBoxStyle}>
            <h2 className={classes.transactionTitle}>{titleContent}</h2>
            <p className={classes.transactionSubtitle}>{subtitleContent}</p>
         </div>
         {children}
      </div>
   );
};
