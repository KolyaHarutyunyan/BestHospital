import React from "react";
import { useHistory } from "react-router-dom";
import { TableBodyComponent } from "@eachbase/components";
import { TableBody, TableCell } from "@material-ui/core";
import { resetRadius } from "@eachbase/utils";

export const BillTBodyWithoutScroll = ({ bills }) => {
   const history = useHistory();

   return (
      <TableBody>
         {bills.map((bill, index) => (
            <TableBodyComponent
               key={index}
               handleOpenInfo={() => history.push(`/bill/${bill.id}`)}
               className={"billingSystem"}
            >
               <TableCell>{bill.id}</TableCell>
               <TableCell>{bill.date}</TableCell>
               <TableCell>{bill.payor}</TableCell>
               <TableCell>{bill.client}</TableCell>
               <TableCell style={resetRadius("right")}>
                  {bill.service}
               </TableCell>
            </TableBodyComponent>
         ))}
      </TableBody>
   );
};
