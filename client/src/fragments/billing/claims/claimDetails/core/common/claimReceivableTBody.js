import React, { useContext, useState } from "react";
import {
   DrawerContext,
   getDataForTable,
   handleCreatedAtDate,
   Images,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { tableTheadTbodyStyle } from "./styles";
import { ReceivableBillTable } from "./core";

export const ClaimReceivableTBody = ({ receivable }) => {
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

   const serviceStart = handleCreatedAtDate(receivable.dateOfService?.start, 10, "/");
   const serviceEnd = handleCreatedAtDate(receivable.dateOfService?.end, 10, "/");

   const dateOfService = getTableData(`${serviceStart} - ${serviceEnd}`);
   const placeOfService = getTableData(receivable.placeService);
   const cptCode = getTableData(manageStatus(receivable.cptCode));
   const modifier = getTableData(receivable.modifier);
   const totalUnits = getTableData(receivable.totalUnits);
   const totalBilled = getTableData(receivable.totalBill);
   const renderingProvider = getTableData(receivable.renderingProvider);
   const arrowArea = <img src={Images.dropdownArrowBlue} alt="" />;

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={tbodyClassName} onClick={toggleInfo}>
            <div className={classes.tdStyle}>{dateOfService}</div>
            <div className={classes.tdStyle}>{placeOfService}</div>
            <div className={classes.tdStyle}>{cptCode}</div>
            <div className={classes.tdStyle}>{modifier}</div>
            <div className={classes.tdStyle}>{totalUnits}</div>
            <div className={classes.tdStyle}>{totalBilled}</div>
            <div className={classes.tdStyle}>{renderingProvider}</div>
            <div className={tdClassName}>{arrowArea}</div>
         </div>
         {isShown && <ReceivableBillTable receivableBills={receivable.bills} />}
      </div>
   );
};
