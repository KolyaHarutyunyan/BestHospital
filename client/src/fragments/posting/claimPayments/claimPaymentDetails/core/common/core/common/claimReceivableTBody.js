import React, { useContext } from "react";
import {
   DrawerContext,
   getLimitedVal,
   handleCreatedAtDate,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { claimReceivableTHeadTBodyStyle } from "./styles";

function getReceivData(givenData = "", isOpen, givenWidth) {
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

export const ClaimReceivableTBody = ({ receivable }) => {
   const classes = claimReceivableTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getTableData(data) {
      return showDashIfEmpty(getReceivData(data, open, width));
   }

   const serviceStart = handleCreatedAtDate(receivable.dateOfService?.start, 10, "/");
   const serviceEnd = handleCreatedAtDate(receivable.dateOfService?.end, 10, "/");
   const cptCode = getTableData(manageStatus(receivable.cptCode));
   const modifier = getTableData(receivable.modifier);

   const dateOfService = getTableData(`${serviceStart} - ${serviceEnd}`);
   const placeOfService = getTableData(receivable.placeService);
   const cptCodeAndModif = `${cptCode} - ${modifier}`;
   const totalUnits = getTableData(receivable.totalUnits);
   const allowedUnits = getTableData(receivable.allowedUnits);
   const totalBilled = getTableData(receivable.totalBill);
   const clientResp = getTableData(receivable.clientResp);

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={classes.tbodyRowStyle}>
            <div className={classes.tdStyle}>{dateOfService}</div>
            <div className={classes.tdStyle}>{placeOfService}</div>
            <div className={classes.tdStyle}>{cptCodeAndModif}</div>
            <div className={classes.tdStyle}>{totalUnits}</div>
            <div className={classes.tdStyle}>{allowedUnits}</div>
            <div className={classes.tdStyle}>{totalBilled}</div>
            <div className={classes.tdStyle}>{clientResp}</div>
         </div>
      </div>
   );
};

