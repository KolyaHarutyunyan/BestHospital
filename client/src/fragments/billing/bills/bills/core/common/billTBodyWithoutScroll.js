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
               <TableCell>{getLimitedVal(bill._id, 5)}</TableCell>
               <TableCell>
                  {handleCreatedAtDate(bill.dateOfService, 10, "/")}
               </TableCell>
               <TableCell>{getLimitedVal(bill.payor, 5)}</TableCell>
               <TableCell>{getLimitedVal(bill.client, 5)}</TableCell>
               <TableCell style={resetRadius("right")}>
                  {getLimitedVal(bill.authService, 5)}
               </TableCell>
            </TableBodyComponent>
         ))}
      </TableBody>
   );
};
