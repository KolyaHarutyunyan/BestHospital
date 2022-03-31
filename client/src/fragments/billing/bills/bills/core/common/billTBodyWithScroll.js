import React from "react";
import { useHistory } from "react-router-dom";
import { TableBodyComponent } from "@eachbase/components";
import { TableBody, TableCell } from "@material-ui/core";
import {
   addSignToValueFromStart,
   getLimitedVal,
   getValueByFixedNumber,
   manageStatus,
   resetRadius,
   showDashIfEmpty,
} from "@eachbase/utils";

export const BillTBodyWithScroll = ({ bills = [] }) => {
   const history = useHistory();

   return (
      <TableBody>
         {bills.map((bill, index) => (
            <TableBodyComponent
               key={index}
               handleOpenInfo={() => history.push(`/bill/${bill._id}`)}
               className={"billingSystem"}
            >
               <TableCell style={resetRadius("left")}>
                  <div>{showDashIfEmpty(bill.totalHours)}</div>
               </TableCell>
               <TableCell>
                  <div>
                     {showDashIfEmpty(
                        getLimitedVal(bill.totalUnits.toString())
                     )}
                  </div>
               </TableCell>
               <TableCell>
                  <div>
                     {showDashIfEmpty(
                        addSignToValueFromStart(
                           getValueByFixedNumber(bill.billedRate)
                        )
                     )}
                  </div>
               </TableCell>
               <TableCell>
                  <div>
                     {showDashIfEmpty(
                        addSignToValueFromStart(
                           getValueByFixedNumber(bill.totalAmount)
                        )
                     )}
                  </div>
               </TableCell>
               <TableCell>
                  <div>
                     {showDashIfEmpty(
                        addSignToValueFromStart(
                           getValueByFixedNumber(bill.payerTotal)
                        )
                     )}
                  </div>
               </TableCell>
               <TableCell>
                  <div>
                     {showDashIfEmpty(
                        addSignToValueFromStart(
                           getValueByFixedNumber(bill.clientResp)
                        )
                     )}
                  </div>
               </TableCell>
               <TableCell>
                  <div>
                     {showDashIfEmpty(
                        addSignToValueFromStart(
                           getValueByFixedNumber(bill.billedAmount)
                        )
                     )}
                  </div>
               </TableCell>
               <TableCell>
                  <div>{showDashIfEmpty(manageStatus(bill.claimStatus))}</div>
               </TableCell>
               <TableCell>
                  <div>{showDashIfEmpty(manageStatus(bill.invoiceStatus))}</div>
               </TableCell>
               <TableCell>
                  <div>{showDashIfEmpty(manageStatus(bill.status))}</div>
               </TableCell>
            </TableBodyComponent>
         ))}
      </TableBody>
   );
};
