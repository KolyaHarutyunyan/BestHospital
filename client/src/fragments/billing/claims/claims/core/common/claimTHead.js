import React, { useContext } from "react";
import { SearchAndFilter, TableHeadComponent } from "@eachbase/components";
import { TableCell } from "@material-ui/core";
import {
   DrawerContext,
   getTableHeader,
   getTextDependsOnWidth,
   useWidth,
} from "@eachbase/utils";

const tHeadStyle = {
   boxShadow: "0px 4px 2px #347af01a",
   backgroundColor: "#EBF2FD",
};

export const ClaimTHead = () => {
   const width = useWidth();

   const { open } = useContext(DrawerContext);

   const size = open ? 1575 : 1560;
   const limit = open ? 3 : 5;

   function getClaimTitle(givenTitle = "", ...rest) {
      return getTableHeader(
         givenTitle,
         getTextDependsOnWidth(width, size, givenTitle, limit),
         ...rest
      );
   }

   return (
      <TableHeadComponent tHeadStyle={tHeadStyle}>
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
