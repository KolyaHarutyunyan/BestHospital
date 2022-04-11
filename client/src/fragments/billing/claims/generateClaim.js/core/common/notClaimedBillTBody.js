import React, { useContext } from "react";
import {
   addSignToValueFromStart,
   CheckupContext,
   DrawerContext,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { notClaimedBillTHeadTBodyStyle } from "./styles";
import { CheckBoxInput, DownloadLink } from "@eachbase/components";

function getNotClaimedBillData(givenData = "", isOpen, givenWidth) {
   const firstSize = isOpen ? 1850 : 1825;
   const firstLimit = isOpen ? 12 : 14;

   const secondSize = isOpen ? 1450 : 1500;
   const secondLimit = isOpen ? 8 : 10;

   const initialLimit = isOpen ? 16 : 18;

   const tableData =
      givenWidth <= secondSize
         ? getLimitedVal(givenData, secondLimit)
         : givenWidth > secondSize && givenWidth <= firstSize
         ? getLimitedVal(givenData, firstLimit)
         : getLimitedVal(givenData, initialLimit);

   return tableData;
}

export const NotClaimedBillTBody = ({ notClaimedBill, triggerBill }) => {
   const classes = notClaimedBillTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);
   const { itemsAreChecked, handleItemsCheckup } = useContext(CheckupContext);

   const tbodyClassName = `${classes.tbodyRowStyle} ${
      notClaimedBill.isChecked ? "checked-box" : ""
   }`;

   const dateOfService = handleCreatedAtDate(notClaimedBill.dateOfService, 10, "/");
   const placeOfService = notClaimedBill.placeService?.name;
   const service = notClaimedBill.authService?.serviceId;
   const fundingSource = `${notClaimedBill.payer?.firstName} ${notClaimedBill.payer?.lastName}`;
   const client = `${notClaimedBill.client?.firstName} ${notClaimedBill.client?.lastName}`;
   const units = getValueByFixedNumber(notClaimedBill.totalUnits, 0);
   const claimAmount = addSignToValueFromStart(
      getValueByFixedNumber(notClaimedBill.claimAmount)
   );
   const signature = "signature_example_pdf.pdf"; // notClaimedBill.signature

   function getTableData(data) {
      return showDashIfEmpty(getNotClaimedBillData(data, open, width));
   }

   function handleInputCheckup(event) {
      triggerBill({
         ...notClaimedBill,
         isChecked: event.target.checked,
      });
      itemsAreChecked && handleItemsCheckup(false);
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={tbodyClassName}>
            <div className={`${classes.tdStyle} checkbox-td`}>
               <CheckBoxInput
                  inputId={notClaimedBill.id}
                  inputClassName={classes.billCheckboxStyle}
                  inputChecked={notClaimedBill.isChecked}
                  onInputChange={handleInputCheckup}
               />
            </div>
            <div className={classes.tdStyle}>{getTableData(dateOfService)}</div>
            <div className={classes.tdStyle}>{getTableData(placeOfService)}</div>
            <div className={classes.tdStyle}>{getTableData(service)}</div>
            <div className={classes.tdStyle}>{getTableData(fundingSource)}</div>
            <div className={classes.tdStyle}>{getTableData(client)}</div>
            <div className={classes.tdStyle}>{getTableData(units)}</div>
            <div className={classes.tdStyle}>{getTableData(claimAmount)}</div>
            <div className={`${classes.tdStyle} signature-td`}>
               <DownloadLink
                  linkHref={signature}
                  linkInnerText={"Signature"}
                  linkDownload={true}
               />
            </div>
         </div>
      </div>
   );
};
