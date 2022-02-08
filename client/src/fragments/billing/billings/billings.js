import React from "react";
import { BillingItem } from "./core";
import { billingsStyle } from "./styles";

export const BillingsFragment = ({ billings }) => {
   const classes = billingsStyle();
   console.log("billings ", billings);

   return (
      <>
         <div>billings here</div>
         {[1, 2, 3, 4].map((billing, index) => (
            <BillingItem key={index} billingItem={billing} index={index + 1} />
         ))}
      </>
   );
};
