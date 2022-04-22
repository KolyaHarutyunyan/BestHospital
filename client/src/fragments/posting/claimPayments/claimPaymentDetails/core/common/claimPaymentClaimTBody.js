import React, { useContext, useState } from "react";
import {
    addSignToValueFromStart,
   DrawerContext,
   getFullName,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   Images,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { tableTheadTbodyStyle } from "./styles";
import { ClaimReceivableTable } from "./core";

function getClaimData(givenData = "", isOpen, givenWidth) {
   const firstSize = isOpen ? 1850 : 1730;
   const firstLimit = isOpen ? 18 : 20;

   const secondSize = isOpen ? 1680 : 1640;
   const secondLimit = isOpen ? 12 : 14;

   const thirdSize = isOpen ? 1350 : 1345;
   const thirdLimit = isOpen ? 8 : 10;

   const initialLimit = isOpen ? 21 : 23;

   const tableData =
      givenWidth <= thirdSize
         ? getLimitedVal(givenData, thirdLimit)
         : givenWidth > thirdSize && givenWidth <= secondSize
         ? getLimitedVal(givenData, secondLimit)
         : givenWidth > secondSize && givenWidth <= firstSize
         ? getLimitedVal(givenData, firstLimit)
         : getLimitedVal(givenData, initialLimit);

   return tableData;
}

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
      return showDashIfEmpty(getClaimData(data, open, width));
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
   const totalCharged = getTableData(addSignToValueFromStart(getValueByFixedNumber(claim.totalCharge)));
   const totalPaid = getTableData(addSignToValueFromStart(getValueByFixedNumber(claim.amountPaid)));
   const remaining = getTableData(addSignToValueFromStart(getValueByFixedNumber(claim.remaining)));
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
