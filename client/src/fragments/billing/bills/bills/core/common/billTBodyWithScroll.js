import React from "react";
import { useHistory } from "react-router-dom";
import { TableBodyComponent } from "@eachbase/components";
import { TableBody, TableCell } from "@material-ui/core";
import { resetRadius } from "@eachbase/utils";

export const BillTBodyWithScroll = ({ bills }) => {
   const history = useHistory();

   return (
      <TableBody>
         {bills.map((bill, index) => (
            <TableBodyComponent
               key={index}
               handleOpenInfo={() => history.push(`/bill/${bill.id}`)}
               className={"billingSystem"}
            >
               <TableCell style={resetRadius("left")}>{bill.hours}</TableCell>
               <TableCell>{bill.units}</TableCell>
               <TableCell>{bill.billedRate}</TableCell>
               <TableCell>{bill.totalAmount}</TableCell>
               <TableCell>{bill.payorBalance}</TableCell>
               <TableCell>{bill.clientBalance}</TableCell>
               <TableCell>{bill.totalBalance}</TableCell>
               <TableCell>{bill.claimStatus}</TableCell>
               <TableCell>{bill.invoiceStatus}</TableCell>
               <TableCell>{bill.status}</TableCell>
            </TableBodyComponent>
         ))}
      </TableBody>
   );
};
