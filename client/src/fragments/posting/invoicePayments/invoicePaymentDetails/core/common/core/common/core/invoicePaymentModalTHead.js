import React from "react";
import { invoiceModalTHeadTBodyStyle } from "./styles";
import { SearchAndFilter } from "@eachbase/components";

export const InvoicePaymentModalTHead = () => {
   const classes = invoiceModalTHeadTBodyStyle();

   const paidAmount = <SearchAndFilter title={"Paid Amount"} custom={false} />;
   const action = <SearchAndFilter title={""} custom={false} />;

   return (
      <div className={classes.tableTheadStyle}>
         <div className={classes.thStyle}>{paidAmount}</div>
         <div className={classes.thStyle}>{action}</div>
      </div>
   );
};
