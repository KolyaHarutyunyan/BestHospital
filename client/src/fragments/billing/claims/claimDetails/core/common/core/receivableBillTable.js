import React from "react";
import { receivableBillTableStyle } from "./styles";
import { NoItemText } from "@eachbase/components";
import { ReceivableBillTBody, ReceivableBillTHead } from "./common";

export const ReceivableBillTable = ({ receivableBills = [] }) => {
   const classes = receivableBillTableStyle();

   return (
      <div className={classes.recBillTableStyle}>
         <div className={classes.recBillContainerStyle}>
            <h6 className={classes.recBillTitleStyle}>Bills</h6>
            {!!receivableBills?.length ? (
               <div className={classes.receivableBillContainerStyle}>
                  <ReceivableBillTHead />
                  <div>
                     {receivableBills.map((item, index) => (
                        <ReceivableBillTBody
                           key={index}
                           receivableBill={item}
                        />
                     ))}
                  </div>
               </div>
            ) : (
               <NoItemText text={"No Receivable Bills Yet"} />
            )}
         </div>
      </div>
   );
};
