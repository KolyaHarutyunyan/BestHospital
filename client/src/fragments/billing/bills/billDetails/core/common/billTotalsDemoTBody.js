import React from "react";
import { TableBody, TableCell } from "@material-ui/core";
import { TableBodyComponent } from "@eachbase/components";
import { tableTheadTbodyStyle } from "./styles";
import {
   addSignToValueFromStart,
   getValueByFixedNumber,
} from "@eachbase/utils";

export const BillTotalsDemoTBody = ({ billTotals }) => {
   const classes = tableTheadTbodyStyle();

   return (
      <TableBody>
         <TableBodyComponent active className={classes.tbodyRowStyle}>
            <TableCell>
               <div>
                  {addSignToValueFromStart(
                     getValueByFixedNumber(billTotals.billedRate, 2)
                  )}
               </div>
            </TableCell>
            <TableCell>
               <div>
                  {addSignToValueFromStart(
                     getValueByFixedNumber(billTotals.totalAmount, 2)
                  )}
               </div>
            </TableCell>
            <TableCell>
               <div>
                  {addSignToValueFromStart(
                     getValueByFixedNumber(billTotals.payorBalance, 2)
                  )}
               </div>
            </TableCell>
            <TableCell>
               <div>
                  {addSignToValueFromStart(
                     getValueByFixedNumber(billTotals.clientBalance, 2)
                  )}
               </div>
            </TableCell>
            <TableCell>
               <div>
                  {addSignToValueFromStart(
                     getValueByFixedNumber(billTotals.totalBalance, 2)
                  )}
               </div>
            </TableCell>
         </TableBodyComponent>
      </TableBody>
   );
};
