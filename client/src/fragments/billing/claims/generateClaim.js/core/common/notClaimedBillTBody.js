import React, { useContext } from "react";
import {
   CheckupContext,
   DrawerContext,
   getGeneratingDataForTable,
   hooksForTable,
   useWidth,
} from "@eachbase/utils";
import { notClaimedBillTHeadTBodyStyle } from "./styles";
import { CheckBoxInput, DownloadLink } from "@eachbase/components";

export const NotClaimedBillTBody = ({ notClaimedBill, triggerBill }) => {
   const classes = notClaimedBillTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);
   const { itemsAreChecked, handleItemsCheckup } = useContext(CheckupContext);

   const tbodyClassName = `${classes.tbodyRowStyle} ${
      notClaimedBill.isChecked ? "checked-box" : ""
   }`;

   const {
      addSignToValueFromStart,
      getFullName,
      getValueByFixedNumber,
      handleCreatedAtDate,
      showDashIfEmpty,
   } = hooksForTable;

   function getTableData(data) {
      return showDashIfEmpty(getGeneratingDataForTable(data, open, width));
   }

   function handleInputCheckup(event) {
      triggerBill({
         ...notClaimedBill,
         isChecked: event.target.checked,
      });
      itemsAreChecked && handleItemsCheckup(false);
   }

   const clientFirstName = notClaimedBill.client?.firstName;
   const clientLastName = notClaimedBill.client?.lastName;

   const dateOfService = getTableData(handleCreatedAtDate(notClaimedBill.dateOfService));
   const placeOfService = getTableData(notClaimedBill.placeService?.name);
   const service = getTableData(notClaimedBill.authService?.serviceId);
   const payor = getTableData(notClaimedBill.payer?.name);
   const client = getFullName(clientFirstName, clientLastName, getTableData);
   const units = getTableData(getValueByFixedNumber(notClaimedBill.totalUnits, 0));
   const claimAmount = getTableData(
      addSignToValueFromStart(getValueByFixedNumber(notClaimedBill.claimAmount))
   );
   const signature = "signature_example_pdf.pdf"; // notClaimedBill.signature

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={tbodyClassName}>
            <div className={`${classes.tdStyle} checkbox-td`}>
               <CheckBoxInput
                  inputId={notClaimedBill._id}
                  inputClassName={classes.billCheckboxStyle}
                  inputChecked={notClaimedBill.isChecked}
                  onInputChange={handleInputCheckup}
               />
            </div>
            <div className={classes.tdStyle}>{dateOfService}</div>
            <div className={classes.tdStyle}>{placeOfService}</div>
            <div className={classes.tdStyle}>{service}</div>
            <div className={classes.tdStyle}>{payor}</div>
            <div className={classes.tdStyle}>{client}</div>
            <div className={classes.tdStyle}>{units}</div>
            <div className={classes.tdStyle}>{claimAmount}</div>
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
