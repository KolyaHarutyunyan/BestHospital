import React from "react";
import { tableTheadTbodyStyle } from "./styles";
import { SearchAndFilter, TableHeadComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";

export const BillTotalsDemoTHead = () => {
   const classes = tableTheadTbodyStyle();

   return (
      <TableHeadComponent theadClassName={classes.tableTheadStyle}>
         <TableCell>
            <SearchAndFilter
               title={"Billed Rate"}
               custom={false}
               iconsAreLight
            />
         </TableCell>
         <TableCell>
            <SearchAndFilter
               title={"Total Amount"}
               custom={false}
               iconsAreLight
            />
         </TableCell>
         <TableCell>
            <SearchAndFilter
               title={"Payor Balance"}
               custom={false}
               iconsAreLight
            />
         </TableCell>
         <TableCell>
            <SearchAndFilter
               title={"Client Balance"}
               custom={false}
               iconsAreLight
            />
         </TableCell>
         <TableCell>
            <SearchAndFilter
               title={"Total Balance"}
               custom={false}
               iconsAreLight
            />
         </TableCell>
      </TableHeadComponent>
   );
};
