import React from "react";
import { TableCell } from "@material-ui/core";
import { TableHeadComponent, SearchAndFilter } from "@eachbase/components";
import { tableTheadTbodyStyle } from "./styles";

export const TransactionsDemoTHead = () => {
   const classes = tableTheadTbodyStyle();

   return (
      <TableHeadComponent theadClassName={classes.tableTheadStyle}>
         <TableCell>
            <SearchAndFilter title={"ID"} custom={false} iconsAreLight />
         </TableCell>
         <TableCell>
            <SearchAndFilter
               title={"Date"}
               type={"latestEarliest"}
               iconsAreLight
            />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Creator"} iconsAreLight />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Type"} type={"arrow"} iconsAreLight />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Amount"} custom={false} iconsAreLight />
         </TableCell>
         <TableCell>
            <SearchAndFilter
               title={"Payment Ref. Number"}
               custom={false}
               iconsAreLight
            />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Note"} custom={false} iconsAreLight />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Action"} custom={false} iconsAreLight />
         </TableCell>
      </TableHeadComponent>
   );
};
