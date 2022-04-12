import React, { useContext } from "react";
import { SearchAndFilter, TableHeadComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import {
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   useWidth,
} from "@eachbase/utils";
import { claimTHeadTBodyStyle } from "./styles";

export const ClaimTHead = () => {
   const classes = claimTHeadTBodyStyle();

   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const size = open ? 1830 : 1680;
   const limit = open ? 3 : 4;

   function getClaimTitle(givenTitle = "", ...rest) {
      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   return (
      <TableHeadComponent theadClassName={classes.theadStyle}>
         <TableCell>
            <SearchAndFilter title={"ID"} custom={false} />
         </TableCell>
         <TableCell>{getClaimTitle("Date Period", "latestEarliest")}</TableCell>
         <TableCell>{getClaimTitle("Funding Source")}</TableCell>
         <TableCell>
            <SearchAndFilter title={"Client"} />
         </TableCell>
         <TableCell>{getClaimTitle("Total Charged", "", false)}</TableCell>
         <TableCell>{getClaimTitle("Total Paid", "", false)}</TableCell>
         <TableCell>
            <SearchAndFilter title={"Remaining"} custom={false} />
         </TableCell>
         <TableCell>
            <SearchAndFilter title={"Status"} type={"arrow"} />
         </TableCell>
         <TableCell>{getClaimTitle("Payment Reference", "", false)}</TableCell>
      </TableHeadComponent>
   );
};
