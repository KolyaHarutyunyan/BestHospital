import React, { useContext, useEffect, useState } from "react";
import { notInvoicedBillTHeadTBodyStyle } from "./styles";
import {
   CheckupContext,
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   useWidth,
} from "@eachbase/utils";
import { CheckBoxInput, SimpleTooltip } from "@eachbase/components";

export const NotInvoicedBillTHead = ({ uncheckAllBills }) => {
   const classes = notInvoicedBillTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);
   const { itemsAreChecked, handleItemsCheckup } = useContext(CheckupContext);

   const [checked, setChecked] = useState(false);

   useEffect(() => {
      if (checked) return;

      uncheckAllBills && uncheckAllBills();
   }, [checked]);

   function getNotInvoicedBillTitle(givenTitle = "", ...rest) {
      const size = open ? 1650 : 1500;
      const limit = open ? 6 : 8;

      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   const billId = getNotInvoicedBillTitle("ID", "", false);
   const serviceCode = getNotInvoicedBillTitle("Service Code", "", false);
   const placeOfService = getNotInvoicedBillTitle("Place of Service", "", false);
   const serviceDate = getNotInvoicedBillTitle(
      "Service Date",
      "latestEarliest",
      true,
      true
   );
   const client = getNotInvoicedBillTitle("Client", "", true, true);
   const hours = getNotInvoicedBillTitle("Hours", "", false);
   const invoiceAmount = getNotInvoicedBillTitle("Invoice Amount", "", false);
   const signature = getNotInvoicedBillTitle("Signature", "", false);

   return (
      <div className={classes.tableTheadStyle}>
         <SimpleTooltip title={"Select"} placement={"top-start"}>
            <div className={`${classes.thStyle} checkbox-th`}>
               <CheckBoxInput
                  inputId={"notInvoicedBills"}
                  inputClassName={classes.billCheckboxStyle}
                  inputChecked={itemsAreChecked}
                  onInputChange={(event) => {
                     handleItemsCheckup(event.target.checked);
                     setChecked(event.target.checked);
                  }}
                  uniqueCheckbox
               />
            </div>
         </SimpleTooltip>
         <div className={classes.thStyle}>{billId}</div>
         <div className={classes.thStyle}>{serviceCode}</div>
         <div className={classes.thStyle}>{placeOfService}</div>
         <div className={classes.thStyle}>{serviceDate}</div>
         <div className={classes.thStyle}>{client}</div>
         <div className={classes.thStyle}>{hours}</div>
         <div className={classes.thStyle}>{invoiceAmount}</div>
         <div className={classes.thStyle}>{signature}</div>
      </div>
   );
};
