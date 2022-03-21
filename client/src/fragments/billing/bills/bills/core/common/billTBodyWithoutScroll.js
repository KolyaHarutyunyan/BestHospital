import React from "react";
import { useHistory } from "react-router-dom";
import { TableBodyComponent } from "@eachbase/components";
import { TableBody, TableCell } from "@material-ui/core";
import {
   getLimitedVal,
   handleCreatedAtDate,
   resetRadius,
} from "@eachbase/utils";

export const BillTBodyWithoutScroll = ({ bills }) => {
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
                  <div>{getLimitedVal(bill._id, 13)}</div>
               </TableCell>
               <TableCell>
                  <div>{handleCreatedAtDate(bill.dateOfService, 10, "/")}</div>
               </TableCell>
               <TableCell>
                  <div>{getLimitedVal(bill.payor, 13)}</div>
               </TableCell>
               <TableCell>
                  <div>{getLimitedVal(bill.client, 13)}</div>
               </TableCell>
               <TableCell style={resetRadius("right")}>
                  <div>{getLimitedVal(bill.authService, 13)}</div>
               </TableCell>
            </TableBodyComponent>
         ))}
      </TableBody>
   );
};
