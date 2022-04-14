import React, { useContext } from "react";
import { generateClaimCoreStyle } from "./styles";
import { NotClaimedBillTBody, NotClaimedBillTHead } from "./common";
import { CheckedItemsQtyInfoWrapper } from "@eachbase/components";
import { CheckupContext } from "@eachbase/utils";

export const NotClaimedBillTable = ({
   notClaimedBills = [],
   triggerBill,
   uncheckAllBills,
}) => {
   const classes = generateClaimCoreStyle();

   const { itemsAreChecked, handleItemsCheckup } = useContext(CheckupContext);

   const selectedBillsInfo = `All ${notClaimedBills.length} bills on this page are selected.`;

   function handleBillsUnchecking() {
      uncheckAllBills();
      handleItemsCheckup(false);
   }

   return (
      <div className={classes.notClaimedBillTableStyle}>
         {itemsAreChecked && (
            <CheckedItemsQtyInfoWrapper onClickButton={handleBillsUnchecking}>
               <p className={classes.billsQtyInfoStyle}>{selectedBillsInfo}</p>
            </CheckedItemsQtyInfoWrapper>
         )}
         <NotClaimedBillTHead uncheckAllBills={uncheckAllBills} />
         <div>
            {notClaimedBills.map((item, index) => (
               <NotClaimedBillTBody
                  key={index}
                  notClaimedBill={item}
                  triggerBill={triggerBill}
               />
            ))}
         </div>
      </div>
   );
};
