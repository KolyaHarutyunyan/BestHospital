import React from "react";
import { useHistory } from "react-router-dom";
import { TableBodyComponent } from "@eachbase/components";
import { TableBody, TableCell } from "@material-ui/core";
import { manageStatus, resetRadius } from "@eachbase/utils";

export const BillTBodyWithScroll = ({ bills }) => {
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
                  {bill.totalHours}
               </TableCell>
               <TableCell>{bill.totalUnits}</TableCell>
               <TableCell>{bill.billedRate}</TableCell>
               <TableCell>{bill.totalAmount}</TableCell>
               <TableCell>{bill.payerTotal}</TableCell>
               <TableCell>{bill.clientResp}</TableCell>
               <TableCell>{bill.billedAmount}</TableCell>
               <TableCell>{manageStatus(bill.claimStatus)}</TableCell>
               <TableCell>{manageStatus(bill.invoiceStatus)}</TableCell>
               <TableCell>{manageStatus(bill.status)}</TableCell>
            </TableBodyComponent>
         ))}
      </TableBody>
   );
};
