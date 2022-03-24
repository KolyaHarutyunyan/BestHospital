import React from "react";
import { useHistory } from "react-router-dom";
import { TableBodyComponent } from "@eachbase/components";
import { TableBody, TableCell } from "@material-ui/core";
import {
   getLimitedVal,
   handleCreatedAtDate,
   resetRadius,
   showDashIfEmpty,
} from "@eachbase/utils";

export const BillTBodyWithoutScroll = ({ bills = [] }) => {
   const history = useHistory();

   return (
      <TableBody>
         {bills.map((bill, index) => (
            <TableBodyComponent
               key={index}
               handleOpenInfo={() => history.push(`/bill/${bill._id}`)}
               className={"billingSystem"}
            >
               <TableCell>
                  <div>{showDashIfEmpty(getLimitedVal(bill._id, 13))}</div>
               </TableCell>
               <TableCell>
                  <div>
                     {showDashIfEmpty(
                        handleCreatedAtDate(bill.dateOfService, 10, "/")
                     )}
                  </div>
               </TableCell>
               <TableCell>
                  <div>
                     {showDashIfEmpty(
                        getLimitedVal(bill.payor?.middleName, 13)
                     )}
                  </div>
               </TableCell>
               <TableCell>
                  <div>
                     {showDashIfEmpty(
                        getLimitedVal(bill.client?.middleName, 13)
                     )}
                  </div>
               </TableCell>
               <TableCell style={resetRadius("right")}>
                  <div>
                     {showDashIfEmpty(
                        getLimitedVal(bill.authService?.authorizationId, 13)
                     )}
                  </div>
               </TableCell>
            </TableBodyComponent>
         ))}
      </TableBody>
   );
};
