import React, { useContext } from "react";
import { generateInvoiceCoreStyle } from "./styles";
import { NotInvoicedBillTBody, NotInvoicedBillTHead } from "./common";
import { CheckedItemsQtyInfoWrapper } from "@eachbase/components";
import { CheckupContext } from "@eachbase/utils";

export const NotInvoicedBillTable = ({
   notInvoicedBills = [],
   triggerBill,
   uncheckAllBills,
}) => {
   const classes = generateInvoiceCoreStyle();

   const { itemsAreChecked, handleItemsCheckup } = useContext(CheckupContext);

   const selectedBillsInfo = `All ${notInvoicedBills.length} bills on this page are selected.`;

   function handleBillsUnchecking() {
      uncheckAllBills();
      handleItemsCheckup(false);
   }

   return (
      <div className={classes.notInvoicedBillTableStyle}>
         {itemsAreChecked && (
            <CheckedItemsQtyInfoWrapper onClickButton={handleBillsUnchecking}>
               <p className={classes.billsQtyInfoStyle}>{selectedBillsInfo}</p>
            </CheckedItemsQtyInfoWrapper>
         )}
         <NotInvoicedBillTHead uncheckAllBills={uncheckAllBills} />
         <div>
            {notInvoicedBills.map((item, index) => (
               <NotInvoicedBillTBody
                  key={index}
                  notInvoicedBill={item}
                  triggerBill={triggerBill}
               />
            ))}
         </div>
      </div>
   );
};
