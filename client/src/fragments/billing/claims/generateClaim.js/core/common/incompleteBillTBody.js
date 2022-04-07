import React, { useContext, useState } from "react";
import {
   DrawerContext,
   getLimitedVal,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { incompleteBillTHeadTBodyStyle } from "./styles";
import { DownloadLink } from "@eachbase/components";

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

export const IncompleteBillTBody = ({ incompleteBill }) => {
   const classes = incompleteBillTHeadTBodyStyle();

   const [isChecked, setIsChecked] = useState(false);

   function toggleInfo() {
      setIsChecked((prevState) => !prevState);
   }

   const tbodyClassName = `${classes.tbodyRowStyle} ${
      isChecked ? "checked-box" : ""
   }`;
   const tdClassName = `${classes.tdStyle} checkbox-td ${
      isChecked ? "checked-box" : ""
   }`;

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   function getTableData(data) {
      return showDashIfEmpty(getReceivData(data, open, width));
   }

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={tbodyClassName} onClick={toggleInfo}>
            <div className={tdClassName}></div>
            <div className={classes.tdStyle}>
               {getTableData(incompleteBill.dateOfService)}
            </div>
            <div className={classes.tdStyle}>
               {getTableData(incompleteBill.placeOfService)}
            </div>
            <div className={classes.tdStyle}>
               {getTableData(manageStatus(incompleteBill.cptCode))}
            </div>
            <div className={classes.tdStyle}>
               {getTableData(incompleteBill.modifier)}
            </div>
            <div className={classes.tdStyle}>
               {getTableData(incompleteBill.totalUnits)}
            </div>
            <div className={classes.tdStyle}>
               {getTableData(incompleteBill.totalBilled)}
            </div>
            <div className={classes.tdStyle}>
               {getTableData(incompleteBill.renderingProvider)}
            </div>
            <div className={`${classes.tdStyle} signature-td`}>
               <DownloadLink
                  linkHref={incompleteBill.signature}
                  linkInnerText={"Signature"}
                  linkDownload={true}
               />
            </div>
         </div>
      </div>
   );
};
