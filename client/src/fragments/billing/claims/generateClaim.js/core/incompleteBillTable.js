import React from "react";
import { generateClaimCoreStyle } from "./styles";
import { IncompleteBillTBody, IncompleteBillTHead } from "./common";

export const IncompleteBillTable = ({ incompleteBills }) => {
   const classes = generateClaimCoreStyle();

   return (
      <div className={classes.incompleteBillTableStyle}>
         <IncompleteBillTHead />
         <div>
            {incompleteBills.map((item, index) => (
               <IncompleteBillTBody key={index} incompleteBill={item} />
            ))}
         </div>
      </div>
   );
};
