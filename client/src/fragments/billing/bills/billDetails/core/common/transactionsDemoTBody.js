import React, { useContext } from "react";
import { TableBody, TableCell } from "@material-ui/core";
import { TableBodyComponent } from "@eachbase/components";
import {
   addSignToValueFromStart,
   DrawerContext,
   getLimitedVal,
   getValueByFixedNumber,
   handleCreatedAtDate,
   manageStatus,
   showDashIfEmpty,
   useWidth,
} from "@eachbase/utils";
import { tableTheadTbodyStyle } from "./styles";

export const TransactionsDemoTBody = ({
   billTransactionDetails = [],
   openConfirmingModal,
   onTrigger,
}) => {
   const classes = tableTheadTbodyStyle();

   const { open } = useContext(DrawerContext);

   const width = useWidth();

   return (
      <TableBody>
         {billTransactionDetails.map((item, index) => {
            const _isVoided = item.status === "VOID";

            const noteDisplay =
               width <= 1345
                  ? getLimitedVal(item.note, open ? 5 : 25)
                  : width > 1345 && width <= 1640
                  ? getLimitedVal(item.note, open ? 10 : 35)
                  : width > 1640 && width <= 1770
                  ? getLimitedVal(item.note, open ? 40 : 65)
                  : getLimitedVal(item.note, open ? 75 : 95);

            return (
               <TableBodyComponent
                  key={index}
                  active
                  className={classes.tbodyRowStyle}
               >
                  <TableCell>
                     <div>{showDashIfEmpty(getLimitedVal(item._id, 13))}</div>
                  </TableCell>
                  <TableCell>
                     <div>
                        {showDashIfEmpty(
                           handleCreatedAtDate(item.date, 10, "/")
                        )}
                     </div>
                  </TableCell>
                  <TableCell>
                     <div>
                        {showDashIfEmpty(getLimitedVal(item.creator, 15))}
                     </div>
                  </TableCell>
                  <TableCell>
                     <div>
                        {showDashIfEmpty(
                           getLimitedVal(manageStatus(item.type), 21)
                        )}
                     </div>
                  </TableCell>
                  <TableCell>
                     <div>
                        {showDashIfEmpty(
                           addSignToValueFromStart(
                              getValueByFixedNumber(item.rate, 2)
                           )
                        )}
                     </div>
                  </TableCell>
                  <TableCell>
                     <div>
                        {showDashIfEmpty(getLimitedVal(item.paymentRef, 13))}
                     </div>
                  </TableCell>
                  <TableCell>
                     <div>{showDashIfEmpty(noteDisplay)}</div>
                  </TableCell>
                  <TableCell>
                     <button
                        className={`${classes.voidActionStyle} ${
                           _isVoided ? "voided" : ""
                        }`}
                        onClick={() => {
                           if (_isVoided) return;
                           openConfirmingModal();
                           onTrigger(item._id);
                        }}
                     >
                        {_isVoided ? "Voided" : "Void"}
                     </button>
                  </TableCell>
               </TableBodyComponent>
            );
         })}
      </TableBody>
   );
};
