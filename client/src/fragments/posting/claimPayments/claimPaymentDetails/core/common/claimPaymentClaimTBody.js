import React, { useContext, useState } from "react";
import {
   DrawerContext,
   getDataForTable,
   hooksForTable,
   Images,
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

   const {
      addSignToValueFromStart,
      getFullName,
      getValueByFixedNumber,
      handleCreatedAtDate,
      showDashIfEmpty,
   } = hooksForTable;

   function getTableData(data) {
      return showDashIfEmpty(getDataForTable(data, open, width));
   }

   const early = handleCreatedAtDate(claim.dateRange?.early);
   const latest = handleCreatedAtDate(claim.dateRange?.latest);
   const clientFirstName = claim.client?.firstName;
   const clientLastName = claim.client?.lastName;

   const claimId = getTableData(claim._id);
   const datePeriod = getTableData(`${early} - ${latest}`);
   const funder = getTableData(claim.funder?.name);
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
         {isShown && <ClaimReceivableTable claimReceivables={claim.receivable} />}
      </div>
   );
};
