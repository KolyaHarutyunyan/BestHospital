import React from "react";
import { BillItem } from "./core";
import { billsStyle } from "./styles";

export const BillsFragment = ({ bills }) => {
   const classes = billsStyle();

   return (
      <>
         <div>bills here</div>
         {[1, 2, 3, 4].map((bill, index) => (
            <BillItem key={index} billItem={bill} index={index + 1} />
         ))}
      </>
   );
};
