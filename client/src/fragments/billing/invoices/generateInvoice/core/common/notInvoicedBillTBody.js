import React, { useContext } from "react";
import {
   addSignToValueFromStart,
   CheckupContext,
   DrawerContext,
   getFullName,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { notInvoicedBillTHeadTBodyStyle } from "./styles";
import { CheckBoxInput, DownloadLink } from "@eachbase/components";

function getNotInvoicedBillData(givenData = "", isOpen, givenWidth) {
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

export const NotInvoicedBillTBody = ({ notInvoicedBill, triggerBill }) => {
   const classes = notInvoicedBillTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);
   const { itemsAreChecked, handleItemsCheckup } = useContext(CheckupContext);

   const tbodyClassName = `${classes.tbodyRowStyle} ${
      notInvoicedBill.isChecked ? "checked-box" : ""
   }`;

   function getTableData(data) {
      return showDashIfEmpty(getNotInvoicedBillData(data, open, width));
   }

   function handleInputCheckup(event) {
      triggerBill({
         ...notInvoicedBill,
         isChecked: event.target.checked,
      });
      itemsAreChecked && handleItemsCheckup(false);
   }

   const billId = getTableData(notInvoicedBill._id);
   const serviceCode = getTableData(notInvoicedBill.authService?.serviceId);
   const placeOfService = getTableData(notInvoicedBill.placeService?.name);
   const serviceDate = getTableData(
      handleCreatedAtDate(notInvoicedBill.dateOfService, 10, "/")
   );
   const clientFirstName = notInvoicedBill.client?.firstName;
   const clientLastName = notInvoicedBill.client?.lastName;
   const client = getFullName(clientFirstName, clientLastName, getTableData);
   const hours = getTableData(getValueByFixedNumber(notInvoicedBill.totalHours, 0));
   const invoiceAmount = getTableData(
      addSignToValueFromStart(getValueByFixedNumber(notInvoicedBill.invoiceAmount))
   );
   const signature = "signature_example_pdf.pdf"; // notInvoicedBill.signature

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={tbodyClassName}>
            <div className={`${classes.tdStyle} checkbox-td`}>
               <CheckBoxInput
                  inputId={notInvoicedBill._id}
                  inputClassName={classes.billCheckboxStyle}
                  inputChecked={notInvoicedBill.isChecked}
                  onInputChange={handleInputCheckup}
               />
            </div>
            <div className={classes.tdStyle}>{billId}</div>
            <div className={classes.tdStyle}>{serviceCode}</div>
            <div className={classes.tdStyle}>{placeOfService}</div>
            <div className={classes.tdStyle}>{serviceDate}</div>
            <div className={classes.tdStyle}>{client}</div>
            <div className={classes.tdStyle}>{hours}</div>
            <div className={classes.tdStyle}>{invoiceAmount}</div>
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
