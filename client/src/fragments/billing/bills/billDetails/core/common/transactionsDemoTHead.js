import React from "react";
import { TableCell } from "@material-ui/core";
import { TableHeadComponent, SearchAndFilter } from "@eachbase/components";

export const TransactionsDemoTHead = ({ id, date }) => {
   return (
      <TableHeadComponent tHeadStyle={{}} hasIndividualStyles>
         <TableCell>
            <SearchAndFilter title={"ID"} custom={false} />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Date"} type={"latestEarliest"} />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Creator"} />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Type"} />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Amount"} custom={false} />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Payment Ref. Number"} custom={false} />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Note"} custom={false} />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Action"} custom={false} />
         </TableCell>
      </TableHeadComponent>
   );
};
