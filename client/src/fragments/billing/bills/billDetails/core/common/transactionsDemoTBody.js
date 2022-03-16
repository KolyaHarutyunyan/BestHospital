import React from "react";
import { TableBody, TableCell } from "@material-ui/core";
import { TableBodyComponent } from "@eachbase/components";

export const TransactionsDemoTBody = ({ transactionDetails = [] }) => {
   return (
      <TableBody>
         {transactionDetails.map((item, index) => (
            <TableBodyComponent key={index} className={"billingSystem"}>
               <TableCell>
                  <div>{getLimitedVal(item._id, 13)}</div>
               </TableCell>
               <TableCell>
                  <div>{handleCreatedAtDate(item.dateOfService, 10, "/")}</div>
               </TableCell>
               <TableCell>
                  <div>{getLimitedVal(item.payor, 13)}</div>
               </TableCell>
               <TableCell>
                  <div>{getLimitedVal(item.client, 13)}</div>
               </TableCell>
               <TableCell style={resetRadius("right")}>
                  <div>{getLimitedVal(item.authService, 13)}</div>
               </TableCell>
            </TableBodyComponent>
         ))}
      </TableBody>
   );
};
