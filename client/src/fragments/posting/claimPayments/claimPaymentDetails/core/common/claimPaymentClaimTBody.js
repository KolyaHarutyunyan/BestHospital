import React, { useContext, useState } from "react";
import {
   addSignToValueFromStart,
   DrawerContext,
   getDataForTable,
   getFullName,
   getValueByFixedNumber,
   handleCreatedAtDate,
   Images,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { tableTheadTbodyStyle } from "./styles";
import { ClaimReceivableTable } from "./core";

export const ClaimPaymentClaimTBody = ({ claim }) => {
   const classes = tableTheadTbodyStyle();

   const [isShown, setIsShown] = useState(false);

   function toggleInfo() {
      setIsShown((prevState) => !prevState);
   }

   const tbodyClassName = `${classes.tbodyRowStyle} ${isShown ? "opened" : ""}`;
   const tdClassName = `${classes.arrowTdStyle} ${isShown ? "opened" : ""}`;

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getTableData(data) {
      return showDashIfEmpty(getDataForTable(data, open, width));
   }

   const early = handleCreatedAtDate(claim.dateRange?.early, 10, "/");
   const latest = handleCreatedAtDate(claim.dateRange?.latest, 10, "/");
   const funderFirstName = claim.funder?.firstName;
   const funderLastName = claim.funder?.lastName;
   const clientFirstName = claim.client?.firstName;
   const clientLastName = claim.client?.lastName;

   const claimId = getTableData(claim._id);
   const datePeriod = getTableData(`${early} - ${latest}`);
   const funder = getFullName(funderFirstName, funderLastName, getTableData);
   const client = getFullName(clientFirstName, clientLastName, getTableData);
   const totalCharged = getTableData(
      addSignToValueFromStart(getValueByFixedNumber(claim.totalCharge))
   );
   const totalPaid = getTableData(
      addSignToValueFromStart(getValueByFixedNumber(claim.amountPaid))
   );
   const remaining = getTableData(
      addSignToValueFromStart(getValueByFixedNumber(claim.remaining))
   );
   const arrowArea = <img src={Images.dropdownArrowBlue} alt="" />;

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={tbodyClassName} onClick={toggleInfo}>
            <div className={classes.tdStyle}>{claimId}</div>
            <div className={classes.tdStyle}>{datePeriod}</div>
            <div className={classes.tdStyle}>{funder}</div>
            <div className={classes.tdStyle}>{client}</div>
            <div className={classes.tdStyle}>{totalCharged}</div>
            <div className={classes.tdStyle}>{totalPaid}</div>
            <div className={classes.tdStyle}>{remaining}</div>
            <div className={tdClassName}>{arrowArea}</div>
         </div>
         {isShown && <ClaimReceivableTable claimReceivables={claim.receivables} />}
      </div>
   );
};
