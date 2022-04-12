import React, { useContext, useState } from "react";
import {
   DrawerContext,
   getLimitedVal,
   handleCreatedAtDate,
   Images,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { tableTheadTbodyStyle } from "./styles";
import { ReceivableBillTable } from "./core";

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

export const ReceivableTBody = ({ receivable }) => {
   const classes = tableTheadTbodyStyle();

   const [isShown, setIsShown] = useState(false);

   function toggleInfo() {
      setIsShown((prevState) => !prevState);
   }

   const tbodyClassName = `${classes.tbodyRowStyle} ${isShown ? "opened" : ""}`;
   const tdClassName = `${classes.arrowTdStyle} ${isShown ? "opened" : ""}`;

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const serviceStart = handleCreatedAtDate(receivable.dateOfService?.start, 10, "/");
   const serviceEnd = handleCreatedAtDate(receivable.dateOfService?.end, 10, "/");

   function getTableData(data) {
      return showDashIfEmpty(getReceivData(data, open, width));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={tbodyClassName} onClick={toggleInfo}>
            <div className={classes.tdStyle}>
               {getTableData(`${serviceStart} - ${serviceEnd}`)}
            </div>
            <div className={classes.tdStyle}>{getTableData(receivable.placeService)}</div>
            <div className={classes.tdStyle}>
               {getTableData(manageStatus(receivable.cptCode))}
            </div>
            <div className={classes.tdStyle}>{getTableData(receivable.modifier)}</div>
            <div className={classes.tdStyle}>{getTableData(receivable.totalUnits)}</div>
            <div className={classes.tdStyle}>{getTableData(receivable.totalBill)}</div>
            <div className={classes.tdStyle}>
               {getTableData(receivable.renderingProvider)}
            </div>
            <div className={tdClassName}>
               <img src={Images.dropdownArrowBlue} alt="" />
            </div>
         </div>
         {isShown && <ReceivableBillTable receivableBills={receivable.bills} />}
      </div>
   );
};
