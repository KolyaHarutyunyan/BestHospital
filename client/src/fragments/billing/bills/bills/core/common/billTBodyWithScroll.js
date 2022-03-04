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
                  <div>{bill.totalHours}</div>
               </TableCell>
               <TableCell>
                  <div>{bill.totalUnits}</div>
               </TableCell>
               <TableCell>
                  <div>{bill.billedRate}</div>
               </TableCell>
               <TableCell>
                  <div>{bill.totalAmount}</div>
               </TableCell>
               <TableCell>
                  <div>{bill.payerTotal}</div>
               </TableCell>
               <TableCell>
                  <div>{bill.clientResp}</div>
               </TableCell>
               <TableCell>
                  <div>{bill.billedAmount}</div>
               </TableCell>
               <TableCell>
                  <div>{manageStatus(bill.claimStatus)}</div>
               </TableCell>
               <TableCell>
                  <div>{manageStatus(bill.invoiceStatus)}</div>
               </TableCell>
               <TableCell>
                  <div>{manageStatus(bill.status)}</div>
               </TableCell>
            </TableBodyComponent>
         ))}
      </TableBody>
   );
};
