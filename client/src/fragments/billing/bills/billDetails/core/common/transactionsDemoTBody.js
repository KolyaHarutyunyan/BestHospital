import React, { useContext } from "react";
import { TableBody, TableCell } from "@material-ui/core";
import { TableBodyComponent } from "@eachbase/components";
import {
   addSignToValueFromStart,
   DrawerContext,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   useWidth,
} from "@eachbase/utils";
import { tableTheadTbodyStyle } from "./styles";

export const TransactionsDemoTBody = ({
   billTransactionDetails = [],
   openConfirmingModal,
}) => {
   const classes = tableTheadTbodyStyle();

   const { open } = useContext(DrawerContext);

   const width = useWidth();

   return (
      <TableBody>
         {billTransactionDetails.map((item, index) => (
            <TableBodyComponent
               key={index}
               active
               className={classes.tbodyRowStyle}
            >
               <TableCell>
                  <div>{getLimitedVal(item._id, 13)}</div>
               </TableCell>
               <TableCell>
                  <div>{handleCreatedAtDate(item.date, 10, "/")}</div>
               </TableCell>
               <TableCell>
                  <div>{getLimitedVal(item.creator, 15)}</div>
               </TableCell>
               <TableCell>
                  <div>{getLimitedVal(item.type, 21)}</div>
               </TableCell>
               <TableCell>
                  <div>
                     {addSignToValueFromStart(
                        getValueByFixedNumber(item.amount, 2)
                     )}
                  </div>
               </TableCell>
               <TableCell>
                  <div>{getLimitedVal(item.paymentRefNumber, 13)}</div>
               </TableCell>
               <TableCell>
                  <div>
                     {width <= 1345
                        ? getLimitedVal(item.note, open ? 5 : 25)
                        : width > 1345 && width <= 1640
                        ? getLimitedVal(item.note, open ? 10 : 35)
                        : width > 1640 && width <= 1770
                        ? getLimitedVal(item.note, open ? 40 : 65)
                        : getLimitedVal(item.note, open ? 75 : 95)}
                  </div>
               </TableCell>
               <TableCell>
                  <button
                     className={`${classes.voidActionStyle} ${
                        item.isVoided ? "voided" : ""
                     }`}
                     onClick={() => {
                        if (item.isVoided) return;
                        openConfirmingModal();
                     }}
                  >
                     {item.isVoided ? "Voided" : "Void"}
                  </button>
               </TableCell>
            </TableBodyComponent>
         ))}
      </TableBody>
   );
};
