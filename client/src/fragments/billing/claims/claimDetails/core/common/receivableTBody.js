import React, { useState } from "react";
import {
   addSignToValueFromStart,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   Images,
   manageStatus,
   showDashIfEmpty,
} from "@eachbase/utils";
import { tableTheadTbodyStyle } from "./styles";
import { ReveivableBillTable } from "./core";

export const ReceivableTBody = ({ receivable }) => {
   const classes = tableTheadTbodyStyle();

   const [isShown, setIsShown] = useState(false);

   function toggleInfo() {
      setIsShown((prevState) => !prevState);
   }

   const tbodyClassName = `${classes.tbodyRowStyle} ${isShown ? "opened" : ""}`;
   const arrowClassName = `${classes.arrowTdStyle} ${isShown ? "opened" : ""}`;

   return (
      <div className={classes.tbodyContainerStyle}>
         <div className={tbodyClassName} onClick={toggleInfo}>
            <div>{showDashIfEmpty(receivable.dateOfService)}</div>
            <div>
               {showDashIfEmpty(
                  handleCreatedAtDate(receivable.placeOfService, 10, "/")
               )}
            </div>
            <div>
               {showDashIfEmpty(
                  getLimitedVal(manageStatus(receivable.cptCode), 21)
               )}
            </div>
            <div>
               {showDashIfEmpty(
                  addSignToValueFromStart(
                     getValueByFixedNumber(receivable.modifier, 2)
                  )
               )}
            </div>
            <div>
               {showDashIfEmpty(getLimitedVal(receivable.totalUnits, 13))}
            </div>
            <div>{showDashIfEmpty(receivable.totalBilled)}</div>
            <div className={arrowClassName}>
               <img src={Images.dropdownArrowBlue} alt="" />
            </div>
         </div>
         {isShown && <ReveivableBillTable />}
      </div>
   );
};
