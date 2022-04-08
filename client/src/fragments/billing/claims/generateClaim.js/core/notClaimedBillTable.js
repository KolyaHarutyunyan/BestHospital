import React from "react";
import { generateClaimCoreStyle } from "./styles";
import { NotClaimedBillTBody, NotClaimedBillTHead } from "./common";
import { CheckedItemsQtyInfoWrapper } from "@eachbase/components";

export const NotClaimedBillTable = ({ notClaimedBills = [] }) => {
   const classes = generateClaimCoreStyle();

   return (
      <div className={classes.notClaimedBillTableStyle}>
         <CheckedItemsQtyInfoWrapper>
            <p className={classes.billsQtyInfoStyle}>
               {"All 15 bills on this page are selected."}
            </p>
         </CheckedItemsQtyInfoWrapper>
         <NotClaimedBillTHead />
         <div>
            {notClaimedBills.map((item, index) => (
               <NotClaimedBillTBody key={index} notClaimedBill={item} />
            ))}
         </div>
      </div>
   );
};
